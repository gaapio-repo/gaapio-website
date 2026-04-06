
import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "./PaginationControls";
import { User } from "./types/userTypes";
import { UserSignupsSearch } from "./UserSignupsSearch";
import { UsersTableContent } from "./UsersTableContent";
import { useUserSignups } from "@/hooks/useUserSignups";
import EditUserDialog from "./EditUserDialog";
import { DeleteUserDialog } from "./dialogs/DeleteUserDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function UserSignupsTable() {
  const { filteredUsers, loading, searchQuery, setSearchQuery, refreshUsers } = useUserSignups();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { 
    currentItems: paginatedUsers,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    goToPage
  } = usePagination({
    items: filteredUsers,
    initialItemsPerPage: 10
  });

  const handleOpenEdit = (user: User) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleOpenDelete = (user: User) => {
    setEditUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
  };

  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          status: updatedUser.status
        })
        .eq("id", updatedUser.id);
      
      if (error) throw error;
      
      toast({
        title: "User updated",
        description: "The user has been updated successfully."
      });
      
      await refreshUsers();
      setEditDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    await refreshUsers();
    setDeleteDialogOpen(false);
  };

  return (
    <div className="rounded-lg bg-muted/70 shadow-inner p-5">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">User Sign-ups</h2>
        <p className="text-sm text-muted-foreground">
          Users who have subscribed to a paid plan.
        </p>
      </div>
      <UserSignupsSearch value={searchQuery} onChange={setSearchQuery} />

      <div className="rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <UsersTableContent
              loading={loading}
              items={paginatedUsers}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              searchQuery={searchQuery}
            />
          </Table>
        </div>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {editUser && (
        <>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <EditUserDialog
                user={editUser}
                onSave={handleSaveUser}
                onDelete={() => handleOpenDelete(editUser)}
                onClose={handleCloseEdit}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DeleteUserDialog
                user={editUser}
                onDelete={handleDeleteUser}
                onClose={handleCloseDelete}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
