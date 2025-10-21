import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Employee data from Dashboard.tsx's activeOnboardingData
const activeOnboardingData = [
  {
    id: "AO-001",
    name: "John Doe",
    vendor: "TechSolutions Inc.",
    role: "Senior React Developer",
    project: "Mobile App Redesign",
    startDate: "2025-10-16",
    status: "In Progress",
  },
  {
    id: "AO-002",
    name: "Jane Smith",
    vendor: "DevPro Services",
    role: "Backend Engineer",
    project: "API Infrastructure",
    startDate: "2025-10-17",
    status: "In Progress",
  },
  {
    id: "AO-003",
    name: "Mike Johnson",
    vendor: "CloudExperts Ltd.",
    role: "DevOps Engineer",
    project: "Cloud Migration",
    startDate: "2025-10-18",
    status: "In Progress",
  },
  {
    id: "AO-004",
    name: "Sarah Wilson",
    vendor: "DataVendor Co.",
    role: "Data Analyst",
    project: "Data Analytics",
    startDate: "2025-10-19",
    status: "In Progress",
  },
  {
    id: "AO-005",
    name: "David Brown",
    vendor: "TechSolutions Inc.",
    role: "Frontend Developer",
    project: "Mobile App Redesign",
    startDate: "2025-10-20",
    status: "In Progress",
  },
  {
    id: "AO-006",
    name: "Emily Davis",
    vendor: "DevPro Services",
    role: "Full Stack Developer",
    project: "API Infrastructure",
    startDate: "2025-10-21",
    status: "In Progress",
  },
  {
    id: "AO-007",
    name: "Robert Clark",
    vendor: "CloudExperts Ltd.",
    role: "Cloud Architect",
    project: "Cloud Migration",
    startDate: "2025-10-22",
    status: "In Progress",
  },
  {
    id: "AO-008",
    name: "Lisa Green",
    vendor: "DataVendor Co.",
    role: "BI Analyst",
    project: "Data Analytics",
    startDate: "2025-10-23",
    status: "In Progress",
  },
];

export default function Offboarding() {
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [effectiveDate, setEffectiveDate] = useState<Date>();
  const [vendor, setVendor] = useState("");
  const [project, setProject] = useState("");
  const [comments, setComments] = useState("");
  const [preApproved, setPreApproved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Filter employees based on selected vendor and project
  const filteredEmployees = activeOnboardingData.filter(
    (emp) => emp.vendor === vendor && emp.project === project
  );

  // Get employee name for success modal and submission
  const employeeName = activeOnboardingData.find((emp) => emp.id === employeeId)?.name || "N/A";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!employeeId || !reason || !effectiveDate || !vendor || !project) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock submission for Dashboard.tsx's pendingApprovalsData
    const submission = {
      id: `PA-${Date.now()}`,
      title: `Offboarding Approval - ${vendor}`,
      type: "Offboarding",
      vendor,
      date: format(effectiveDate, "yyyy-MM-dd"),
      status: "Pending",
      comments: comments || reason,
      preApproved,
    };

    console.log("Offboarding Submission:", submission);
    toast.success("Offboarding request submitted successfully!");

    setShowSuccessModal(true);
    handleReset();
  };

  const handleReset = () => {
    setEmployeeId("");
    setReason("");
    setEffectiveDate(undefined);
    setVendor("");
    setProject("");
    setComments("");
    setPreApproved(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Offboarding Request</h1>
        <p className="text-muted-foreground mt-1">Submit an offboarding request for a resource</p>
      </div>

      <Card className="shadow-material-md">
        <CardHeader>
          <CardTitle>Offboarding Details</CardTitle>
          <CardDescription>
            Submit offboarding request due to resignation or end of contract. Business Desk will be
            notified to disable resource tracker access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor *</Label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger id="vendor" aria-label="Select vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="TechSolutions Inc.">TechSolutions Inc.</SelectItem>
                  <SelectItem value="DevPro Services">DevPro Services</SelectItem>
                  <SelectItem value="CloudExperts Ltd.">CloudExperts Ltd.</SelectItem>
                  <SelectItem value="DataVendor Co.">DataVendor Co.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project *</Label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger id="project" aria-label="Select project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Mobile App Redesign">Mobile App Redesign</SelectItem>
                  <SelectItem value="API Infrastructure">API Infrastructure</SelectItem>
                  <SelectItem value="Cloud Migration">Cloud Migration</SelectItem>
                  <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee / V-ID *</Label>
              <Select value={employeeId} onValueChange={setEmployeeId} disabled={!vendor || !project}>
                <SelectTrigger id="employeeId" aria-label="Select employee">
                  <SelectValue placeholder={vendor && project ? "Select employee to offboard" : "Select vendor and project first"} />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {`${emp.id} - ${emp.name} (${emp.role})`}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">No employees available</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason" aria-label="Select reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Resignation">Resignation</SelectItem>
                  <SelectItem value="End of Contract">End of Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Effective Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !effectiveDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {effectiveDate ? format(effectiveDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={effectiveDate}
                    onSelect={setEffectiveDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Enter any additional comments or notes about this offboarding request"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                aria-label="Comments"
              />
              {/* <p className="text-xs text-muted-foreground">
                Provide details or justifications for the offboarding request (optional).
              </p> */}
            </div>

            {/* <div>
              <Label className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={preApproved}
                  onChange={(e) => setPreApproved(e.target.checked)}
                  aria-label="Pre approved offboarding"
                />
                Pre approved offboarding
              </Label>
            </div> */}

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Submit Offboarding Request
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offboarding Request Submitted</DialogTitle>
            <DialogDescription>
              Your offboarding request has been submitted successfully. Business Desk has been notified
              to disable resource tracker access for this employee.
              <br />
              <br />
              <strong>Details:</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>Employee: {employeeName}</li>
                <li>Vendor: {vendor}</li>
                <li>Project: {project}</li>
                <li>Reason: {reason}</li>
                <li>Effective Date: {effectiveDate ? format(effectiveDate, "PPP") : "N/A"}</li>
                <li>Comments: {comments || reason}</li>
                <li>Pre approved: {preApproved ? "Yes" : "No"}</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}