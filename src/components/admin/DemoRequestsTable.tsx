import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { PaginatedTable } from "./PaginatedTable";
import { DemoRequest } from "./types/demoRequestTypes";
import { EditDemoDialog } from "./dialogs/EditDemoDialog";
import { DeleteDemoConfirmDialog } from "./dialogs/DeleteDemoConfirmDialog";
import { useDemoRequests } from "./hooks/useDemoRequests";
import { getDemoTableColumns } from "./components/DemoTableColumns";

export function DemoRequestsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { requests, loading, fetchDemoRequests, handleSearch } = useDemoRequests();

  useEffect(() => {
    fetchDemoRequests();
  }, []);

  const handleEdit = (request: DemoRequest) => {
    setSelectedRequest(request);
    setShowEditDialog(true);
  };

  const handleDelete = (request: DemoRequest) => {
    setSelectedRequest(request);
    setShowDeleteDialog(true);
  };

  const columns = getDemoTableColumns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-muted/70 shadow-inner p-5">
        <div className="mb-3">
          <h2 className="text-xl font-semibold">Demo Requests</h2>
          <p className="text-sm text-muted-foreground">
            View and manage demo requests from potential customers
          </p>
        </div>
        <div className="mb-3">
          <Input
            placeholder="Search by name, email, or notes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="max-w-md bg-muted/70 border-0 shadow-sm"
          />
        </div>

        <PaginatedTable
          data={requests}
          columns={columns}
          loading={loading}
          searchQuery={searchQuery}
          caption="A list of demo requests."
          noDataMessage="No demo requests yet."
        />
      </div>
      {selectedRequest && (
        <>
          <EditDemoDialog
            request={selectedRequest}
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            onSuccess={fetchDemoRequests}
          />
          <DeleteDemoConfirmDialog
            request={selectedRequest}
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onSuccess={fetchDemoRequests}
          />
        </>
      )}
    </div>
  );
}
