import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Trash2, Plus, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Testimonial = {
  id: string;
  author: string;
  text: string;
  rating: number;
  is_active?: boolean | null;
  created_at: string;
  updated_at?: string | null;
};

function useAllTestimonials() {
  return useQuery({
    queryKey: ["testimonials", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });
}

function useCreateTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      author: string;
      text: string;
      rating: number;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from("testimonials").insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials", "all"] }),
  });
}

function useUpdateTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      author?: string;
      text?: string;
      rating?: number;
      is_active?: boolean;
    }) => {
      const { id, ...rest } = payload;
      const { error } = await supabase
        .from("testimonials")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials", "all"] }),
  });
}

function useDeleteTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials", "all"] }),
  });
}

const AdminTestimonials = () => {
  const { toast } = useToast();
  const { data: testimonials, isLoading } = useAllTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  
  const [form, setForm] = useState<{
    author: string;
    text: string;
    rating: string;
    is_active: boolean;
  }>({
    author: "",
    text: "",
    rating: "5",
    is_active: true,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      author: "",
      text: "",
      rating: "5",
      is_active: true,
    });
    setIsFormOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setForm({
      author: testimonial.author ?? "",
      text: testimonial.text ?? "",
      rating: String(testimonial.rating ?? 5),
      is_active: Boolean(testimonial.is_active !== false),
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(null);
  };

  const onSubmit = async () => {
    try {
      const ratingNum = parseInt(form.rating, 10);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        toast({
          title: "Invalid Rating",
          description: "Rating must be between 1 and 5.",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        author: form.author.trim(),
        text: form.text.trim(),
        rating: ratingNum,
        is_active: form.is_active,
      };

      if (!payload.author || !payload.text) {
        toast({
          title: "Fields Required",
          description: "Please provide both author name and testimonial text.",
          variant: "destructive",
        });
        return;
      }

      if (editing) {
        await updateTestimonial.mutateAsync({ id: editing.id, ...payload });
        toast({
          title: "Testimonial Updated",
          description: "The testimonial was updated successfully.",
        });
      } else {
        await createTestimonial.mutateAsync(payload);
        toast({
          title: "Testimonial Created",
          description: "The testimonial was created successfully.",
        });
      }
      closeForm();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message ?? "Failed to save testimonial.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setTestimonialToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (testimonialToDelete) {
      try {
        await deleteTestimonial.mutateAsync(testimonialToDelete);
        toast({
          title: "Testimonial Deleted",
          description: "The testimonial was deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setTestimonialToDelete(null);
      } catch (e: any) {
        toast({
          title: "Error",
          description: e.message ?? "Failed to delete testimonial.",
          variant: "destructive",
        });
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "text-primary fill-primary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {editing ? "Edit Testimonial" : "Create Testimonial"}
            </h2>
            <Button variant="ghost" size="icon" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  className="mt-1"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  placeholder="e.g., Maria S."
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={form.rating}
                  onValueChange={(value) => setForm((f) => ({ ...f, rating: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="text">Testimonial Text</Label>
              <Textarea
                id="text"
                className="mt-1 min-h-[120px]"
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="Enter the testimonial text..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_active"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Active (visible on website)
              </Label>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button
              onClick={onSubmit}
              disabled={createTestimonial.isPending || updateTestimonial.isPending}
            >
              {editing ? "Save Changes" : "Create Testimonial"}
            </Button>
            <Button variant="outline" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* List */}
      <div className="grid gap-4">
        {isLoading ? (
          <Card className="p-4">
            <p className="text-muted-foreground">Loading testimonials...</p>
          </Card>
        ) : testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-lg">{testimonial.author}</h3>
                    <Badge
                      variant={testimonial.is_active !== false ? "default" : "secondary"}
                    >
                      {testimonial.is_active !== false ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="mb-3">{renderStars(testimonial.rating)}</div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    Created: {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(testimonial)}
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteClick(testimonial.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No testimonials yet.</p>
            <Button onClick={openCreate} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Testimonial
            </Button>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTestimonials;
