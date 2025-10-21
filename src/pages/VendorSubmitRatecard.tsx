import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Upload, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

interface Resource {
  id: string;
  candidateName: string;
  vendor: string;
  project: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  proposedRate: string;
  poNumber: string;
  techStack: string;
  resume: File | null;
  businessJustification: string;
}

interface Props {
  requestData: { requestId?: string; project?: string };
  onClose: () => void;
}

export default function VendorSubmitRatecard({ requestData, onClose }: Props) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Resource>>({
    vendor: "TechVendor Inc.",
    project: requestData.project || "",
    location: "remote",
  });

  const handleAddResource = () => {
    if (!formData.candidateName || !formData.role || !formData.proposedRate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newResource: Resource = {
      id: Date.now().toString(),
      candidateName: formData.candidateName || "",
      vendor: formData.vendor || "TechVendor Inc.",
      project: formData.project || "",
      role: formData.role || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      location: formData.location || "remote",
      proposedRate: formData.proposedRate || "",
      poNumber: formData.poNumber || "",
      techStack: formData.techStack || "",
      resume: formData.resume || null,
      businessJustification: formData.businessJustification || "",
    };

    if (editingId) {
      setResources(resources.map((r) => (r.id === editingId ? newResource : r)));
      setEditingId(null);
      toast.success("Resource updated successfully");
    } else {
      setResources([...resources, newResource]);
      toast.success("Resource added successfully");
    }

    setFormData({ vendor: "TechVendor Inc.", project: requestData.project || "", location: "remote" });
    setShowAddForm(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormData(resource);
    setEditingId(resource.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    toast.success("Resource removed");
  };

  const handleSubmit = () => {
    if (resources.length === 0) {
      toast.error("Please add at least one resource");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    setShowConfirmModal(false);
    toast.success("Rate card submitted successfully! Approval flow: FTE Lead → Business Desk");
    setResources([]);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Rate Card</h1>
        <p className="text-muted-foreground mt-1">
          {requestData.requestId ? `Responding to request: ${requestData.requestId}` : "Add resources and submit rate card"}
        </p>
      </div>

      {/* Add Resource Form */}
      {showAddForm && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Resource" : "Add New Resource"}</CardTitle>
            <CardDescription>Fill in all required fields to add a resource to the rate card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name *</Label>
                <Input
                  id="candidateName"
                  value={formData.candidateName || ""}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  placeholder="Enter candidate name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Input
                  id="project"
                  value={formData.project}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Enter role (e.g., Senior Developer)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposedRate">Proposed Rate (USD/hr) *</Label>
                <Input
                  id="proposedRate"
                  type="number"
                  value={formData.proposedRate || ""}
                  onChange={(e) => setFormData({ ...formData, proposedRate: e.target.value })}
                  placeholder="Enter hourly rate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input
                  id="poNumber"
                  value={formData.poNumber || ""}
                  onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                  placeholder="Enter PO number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack</Label>
                <Input
                  id="techStack"
                  value={formData.techStack || ""}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Enter tech stack (e.g., React, Node.js)"
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Resume (PDF, DOC, DOCX)</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formData.resume ? formData.resume.name : "Drag and drop resume here, or click to browse (optional)"}
                  </p>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessJustification">Business Justification</Label>
              <Textarea
                id="businessJustification"
                value={formData.businessJustification || ""}
                onChange={(e) => setFormData({ ...formData, businessJustification: e.target.value })}
                placeholder="Optional: Explain the business need for this resource"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({ vendor: "TechVendor Inc.", project: requestData.project || "", location: "remote" });
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddResource}>
                {editingId ? "Update Resource" : "Add to Rate Card"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Table */}
      {resources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Rate Card Resources ({resources.length})</CardTitle>
            <CardDescription>Review and edit resources before submission</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Candidate</TableHead>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead className="w-[100px]">Role</TableHead>
                  <TableHead className="w-[100px]">Start Date</TableHead>
                  <TableHead className="w-[100px]">End Date</TableHead>
                  <TableHead className="w-[100px]">Location</TableHead>
                  <TableHead className="w-[100px]">Rate</TableHead>
                  <TableHead className="max-w-[200px]">Tech Stack</TableHead>
                  <TableHead className="text-right w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">{resource.candidateName}</TableCell>
                    <TableCell>{resource.project}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>{resource.startDate}</TableCell>
                    <TableCell>{resource.endDate}</TableCell>
                    <TableCell className="capitalize">{resource.location}</TableCell>
                    <TableCell>${resource.proposedRate}/hr</TableCell>
                    <TableCell className="max-w-[200px] min-w-0">
                      <div className="truncate" title={resource.techStack}>
                        {resource.techStack}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(resource)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex gap-3 justify-end mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setResources([])}>
                Clear All
              </Button>
              <Button onClick={handleSubmit}>
                Submit Rate Card
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              You are about to submit a rate card with {resources.length} resource(s).
              This will trigger the approval chain: FTE Lead → Business Desk
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Once submitted, the rate card will be sent for review and approval.
              You will be notified of the approval status.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmission}>
              Confirm Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}