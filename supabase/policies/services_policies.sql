-- Activer RLS si besoin
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Politique: lecture publique des services actifs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'services' AND policyname = 'public_can_select_active_services'
  ) THEN
    CREATE POLICY public_can_select_active_services
      ON public.services
      FOR SELECT
      USING (is_active = true);
  END IF;
END
$$;

-- Politique: les admins peuvent tout faire (select/insert/update/delete)
-- Utiliser auth.jwt()->>'email' pour obtenir l'email de l'utilisateur connecté
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'services' AND policyname = 'admins_can_manage_services'
  ) THEN
    CREATE POLICY admins_can_manage_services
      ON public.services
      FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.admins 
          WHERE email = (auth.jwt()->>'email')::text
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admins 
          WHERE email = (auth.jwt()->>'email')::text
        )
      );
  END IF;
END
$$;