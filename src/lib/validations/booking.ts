import { z } from "zod";

export const bookingSchema = z.object({
  client_name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/),
  address: z.string().min(10).max(200).trim(),
  recipient_name: z.string().min(2).max(100).trim().optional(),
  recipient_type: z.enum(['elderly', 'disabled', 'both']).optional(),
  service_id: z.string().uuid(),
  hours_per_day: z.number().int().min(1).max(24),
  selected_dates: z.array(z.string().date()).min(1),
  total_price: z.number().positive(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
