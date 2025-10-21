// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Check, X, AlertCircle } from "lucide-react";
// import { toast } from "sonner";

// const mockRequests = [
//   { id: "REQ-001", type: "Onboarding", project: "Project Alpha", dates: "2025-01-20 to 2025-12-31", techStack: "React, Node.js", status: "Pending" },
//   { id: "REQ-002", type: "Replacement", project: "Project Beta", dates: "2025-02-01 to 2025-12-31", techStack: "Python, Django", status: "Pending" },
//   { id: "REQ-003", type: "Onboarding", project: "Project Gamma", dates: "2025-01-25 to 2025-12-31", techStack: "Java, Spring", status: "Approved" },
//   { id: "REQ-004", type: "Offboarding", project: "Project Alpha", dates: "2025-03-15", techStack: "N/A", status: "Pending" },
//   { id: "REQ-005", type: "Onboarding", project: "Project Beta", dates: "2025-02-10 to 2025-12-31", techStack: "Angular, .NET", status: "Pending" },
// ];

// export default function ApprovalInbox() {
//   const [filters, setFilters] = useState({ project: "all", status: "all" });
//   const [showCRModal, setShowCRModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<string>("");
//   const [crNotes, setCrNotes] = useState("");
//   const [budgetAdjustment, setBudgetAdjustment] = useState("");

//   const filteredRequests = mockRequests.filter(req => {
//     if (filters.project !== "all" && req.project !== filters.project) return false;
//     if (filters.status !== "all" && req.status !== filters.status) return false;
//     return true;
//   });

//   const handleApprove = (id: string) => {
//     toast.success(`Request ${id} approved successfully`);
//   };

//   const handleReject = (id: string) => {
//     toast.error(`Request ${id} rejected`);
//   };

//   const handleRaiseCR = (id: string) => {
//     setSelectedRequest(id);
//     setShowCRModal(true);
//   };

//   const submitCR = () => {
//     toast.success(`Change Request raised for ${selectedRequest}`);
//     setShowCRModal(false);
//     setCrNotes("");
//     setBudgetAdjustment("");
//   };

//   const getStatusBadge = (status: string) => {
//     if (status === "Pending") return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
//     if (status === "Approved") return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
//     return <Badge variant="outline">{status}</Badge>;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Approval Inbox</h1>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label>Project</Label>
//               <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="Project Alpha">Project Alpha</SelectItem>
//                   <SelectItem value="Project Beta">Project Beta</SelectItem>
//                   <SelectItem value="Project Gamma">Project Gamma</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Status</Label>
//               <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val })}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="Pending">Pending</SelectItem>
//                   <SelectItem value="Approved">Approved</SelectItem>
//                   <SelectItem value="Rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Requests Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Pending Approvals</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Request ID</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Project</TableHead>
//                 <TableHead>Dates</TableHead>
//                 <TableHead>Tech Stack</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredRequests.map((req) => (
//                 <TableRow key={req.id}>
//                   <TableCell className="font-medium">{req.id}</TableCell>
//                   <TableCell>{req.type}</TableCell>
//                   <TableCell>{req.project}</TableCell>
//                   <TableCell>{req.dates}</TableCell>
//                   <TableCell>{req.techStack}</TableCell>
//                   <TableCell>{getStatusBadge(req.status)}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <Button size="sm" variant="default" onClick={() => handleApprove(req.id)} disabled={req.status !== "Pending"}>
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)} disabled={req.status !== "Pending"}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleRaiseCR(req.id)} disabled={req.status !== "Pending"}>
//                         <AlertCircle className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* CR Modal */}
//       <Dialog open={showCRModal} onOpenChange={setShowCRModal}>
//         <DialogContent className="bg-card">
//           <DialogHeader>
//             <DialogTitle>Raise Change Request</DialogTitle>
//             <DialogDescription>Request ID: {selectedRequest}</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="cr-notes">Notes</Label>
//               <Textarea
//                 id="cr-notes"
//                 placeholder="Enter notes for the change request"
//                 value={crNotes}
//                 onChange={(e) => setCrNotes(e.target.value)}
//                 rows={4}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="budget-adjustment">Budget Adjustment (Optional)</Label>
//               <Input
//                 id="budget-adjustment"
//                 type="number"
//                 placeholder="Enter budget adjustment amount"
//                 value={budgetAdjustment}
//                 onChange={(e) => setBudgetAdjustment(e.target.value)}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowCRModal(false)}>Cancel</Button>
//             <Button onClick={submitCR}>Submit CR</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Check, X, AlertCircle } from "lucide-react";
// import { toast } from "sonner";

// const mockRequests = [
//   { 
//     id: "REQ-001", 
//     type: "Onboarding", 
//     project: "Project Alpha", 
//     startDate: "2025-01-20", 
//     endDate: "2025-12-31", 
//     techStack: "React, Node.js", 
//     preapproval: "No",
//     vendor: "Vendor A",
//     noOfResources: 3,
//     status: "Pending",
//     comments: "Urgent onboarding required"
//   },
//   { 
//     id: "REQ-002", 
//     type: "Replacement", 
//     project: "Project Beta", 
//     startDate: "2025-02-01", 
//     endDate: "2025-12-31", 
//     techStack: "Python, Django", 
//     preapproval: "No",
//     vendor: "Vendor B",
//     noOfResources: 2,
//     status: "Pending",
//     comments: "Replacement for existing resource"
//   },
//   { 
//     id: "REQ-003", 
//     type: "Onboarding", 
//     project: "Project Gamma", 
//     startDate: "2025-01-25", 
//     endDate: "2025-12-31", 
//     techStack: "Java, Spring", 
//     preapproval: "Yes",
//     vendor: "Vendor C",
//     noOfResources: 4,
//     status: "Approved",
//     comments: "New project ramp-up"
//   },
//   { 
//     id: "REQ-004", 
//     type: "Offboarding", 
//     project: "Project Alpha", 
//     startDate: "2025-03-15", 
//     endDate: null, 
//     techStack: "N/A", 
//     preapproval: "No",
//     vendor: "Vendor A",
//     noOfResources: 1,
//     status: "Pending",
//     comments: "Contract completion"
//   },
//   { 
//     id: "REQ-005", 
//     type: "Onboarding", 
//     project: "Project Beta", 
//     startDate: "2025-02-10", 
//     endDate: "2025-12-31", 
//     techStack: "Angular, .NET", 
//     preapproval: "No",
//     vendor: "Vendor B",
//     noOfResources: 2,
//     status: "Pending",
//     comments: "Additional resources needed"
//   },
// ];

// export default function ApprovalInbox() {
//   const [filters, setFilters] = useState({ project: "all", status: "all" });
//   const [showCRModal, setShowCRModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
//   const [crNotes, setCrNotes] = useState("");
//   const [budgetAdjustment, setBudgetAdjustment] = useState("");

//   const filteredRequests = mockRequests.filter(req => {
//     if (filters.project !== "all" && req.project !== filters.project) return false;
//     if (filters.status !== "all" && req.status !== filters.status) return false;
//     return true;
//   });

//   const handleApprove = (id: string) => {
//     toast.success(`Request ${id} approved successfully`);
//   };

//   const handleReject = (id: string) => {
//     toast.error(`Request ${id} rejected`);
//   };

//   const handleRaiseCR = (req: typeof mockRequests[0]) => {
//     setSelectedRequest(req);
//     setShowCRModal(true);
//   };

//   const submitCR = () => {
//     toast.success(`Change Request raised for ${selectedRequest?.id}`);
//     setShowCRModal(false);
//     setCrNotes("");
//     setBudgetAdjustment("");
//   };

//   const getStatusBadge = (status: string) => {
//     if (status === "Pending") return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
//     if (status === "Approved") return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
//     return <Badge variant="outline">{status}</Badge>;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Approval Inbox</h1>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label>Project</Label>
//               <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="Project Alpha">Project Alpha</SelectItem>
//                   <SelectItem value="Project Beta">Project Beta</SelectItem>
//                   <SelectItem value="Project Gamma">Project Gamma</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Status</Label>
//               <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val })}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="Pending">Pending</SelectItem>
//                   <SelectItem value="Approved">Approved</SelectItem>
//                   <SelectItem value="Rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Requests Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Pending Approvals</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Request ID</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Project</TableHead>
//                 <TableHead>Tech Stack</TableHead>
//                 <TableHead>Preapproval</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredRequests.map((req) => (
//                 <TableRow key={req.id}>
//                   <TableCell className="font-medium">{req.id}</TableCell>
//                   <TableCell>{req.type}</TableCell>
//                   <TableCell>{req.project}</TableCell>
//                   <TableCell>{req.techStack}</TableCell>
//                   <TableCell>{req.preapproval}</TableCell>
//                   <TableCell>{getStatusBadge(req.status)}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <Button size="sm" variant="default" onClick={() => handleApprove(req.id)} disabled={req.status !== "Pending"}>
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)} disabled={req.status !== "Pending"}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="outline" onClick={() => handleRaiseCR(req)} disabled={req.status !== "Pending"}>
//                         <AlertCircle className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* CR Modal */}
//       <Dialog open={showCRModal} onOpenChange={setShowCRModal}>
//         <DialogContent className="bg-card">
//           <DialogHeader>
//             <DialogTitle>Details</DialogTitle>
//             {/* <DialogDescription>Request ID: {selectedRequest?.id}</DialogDescription> */}
//           </DialogHeader>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Request ID</Label>
//                 <p className="text-sm">{selectedRequest?.id}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Type</Label>
//                 <p className="text-sm">{selectedRequest?.type}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Project</Label>
//                 <p className="text-sm">{selectedRequest?.project}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Date</Label>
//                 <p className="text-sm">
//                   {selectedRequest?.startDate} {selectedRequest?.endDate ? `to ${selectedRequest.endDate}` : ''}
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Tech Stack</Label>
//                 <p className="text-sm">{selectedRequest?.techStack}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Vendor</Label>
//                 <p className="text-sm">{selectedRequest?.vendor}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">No of Resources</Label>
//                 <p className="text-sm">{selectedRequest?.noOfResources}</p>
//               </div>
//               <div className="space-y-1">
//                 <Label className="text-sm font-medium">Status</Label>
//                 <p className="text-sm">{selectedRequest?.status}</p>
//               </div>
//               <div className="space-y-1 col-span-2">
//                 <Label className="text-sm font-medium">Comments</Label>
//                 <p className="text-sm">{selectedRequest?.comments}</p>
//               </div>
//             </div>
//           </div>
//           {/* <DialogFooter>
//             <Button variant="outline" onClick={() => setShowCRModal(false)}>Cancel</Button>
//             <Button onClick={submitCR}>Submit CR</Button>
//           </DialogFooter> */}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check, X, Eye } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const mockRequests = [
  { 
    id: "REQ-001", 
    type: "Onboarding", 
    project: "Project Alpha", 
    startDate: "2025-01-20", 
    endDate: "2025-12-31", 
    techStack: "React, Node.js", 
    preapproval: "No",
    vendor: "Vendor A",
    noOfResources: 3,
    status: "Pending",
    comments: "Urgent onboarding required"
  },
  { 
    id: "REQ-002", 
    type: "Replacement", 
    project: "Project Beta", 
    startDate: "2025-02-01", 
    endDate: "2025-12-31", 
    techStack: "Python, Django", 
    preapproval: "No",
    vendor: "Vendor B",
    noOfResources: 2,
    status: "Pending",
    comments: "Replacement for existing resource"
  },
  { 
    id: "REQ-003", 
    type: "Onboarding", 
    project: "Project Gamma", 
    startDate: "2025-01-25", 
    endDate: "2025-12-31", 
    techStack: "Java, Spring", 
    preapproval: "Yes",
    vendor: "Vendor C",
    noOfResources: 4,
    status: "Approved",
    comments: "New project ramp-up"
  },
  { 
    id: "REQ-004", 
    type: "Offboarding", 
    project: "Project Alpha", 
    startDate: "2025-03-15", 
    endDate: null, 
    techStack: "N/A", 
    preapproval: "No",
    vendor: "Vendor A",
    noOfResources: 1,
    status: "Pending",
    comments: "Contract completion"
  },
  { 
    id: "REQ-005", 
    type: "Onboarding", 
    project: "Project Beta", 
    startDate: "2025-02-10", 
    endDate: "2025-12-31", 
    techStack: "Angular, .NET", 
    preapproval: "No",
    vendor: "Vendor B",
    noOfResources: 2,
    status: "Pending",
    comments: "Additional resources needed"
  },
];

export default function ApprovalInbox() {
  const [filters, setFilters] = useState({ project: "all", status: "all" });
  const [showCRModal, setShowCRModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
  const [crNotes, setCrNotes] = useState("");
  const [budgetAdjustment, setBudgetAdjustment] = useState("");

  const filteredRequests = mockRequests.filter(req => {
    if (filters.project !== "all" && req.project !== filters.project) return false;
    if (filters.status !== "all" && req.status !== filters.status) return false;
    return true;
  });

  const handleApprove = (id: string) => {
    toast.success(`Request ${id} approved successfully`);
  };

  const handleReject = (id: string) => {
    toast.error(`Request ${id} rejected`);
  };

  const handleRaiseCR = (req: typeof mockRequests[0]) => {
    setSelectedRequest(req);
    setShowCRModal(true);
  };

  const submitCR = () => {
    toast.success(`Change Request raised for ${selectedRequest?.id}`);
    setShowCRModal(false);
    setCrNotes("");
    setBudgetAdjustment("");
  };

  const getStatusBadge = (status: string) => {
    if (status === "Pending") return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    if (status === "Approved") return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Approval Inbox</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Project Alpha">Project Alpha</SelectItem>
                  <SelectItem value="Project Beta">Project Beta</SelectItem>
                  <SelectItem value="Project Gamma">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Preapproval</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.project}</TableCell>
                  <TableCell>{req.techStack}</TableCell>
                  <TableCell>{req.preapproval}</TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="default" onClick={() => handleApprove(req.id)} disabled={req.status !== "Pending"}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)} disabled={req.status !== "Pending"}>
                        <X className="h-4 w-4" />
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => handleRaiseCR(req)} disabled={req.status !== "Pending"}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CR Modal */}
      <Dialog open={showCRModal} onOpenChange={setShowCRModal}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Request ID</Label>
                <p className="text-sm">{selectedRequest?.id}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Type</Label>
                <p className="text-sm">{selectedRequest?.type}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Project</Label>
                <p className="text-sm">{selectedRequest?.project}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Date</Label>
                <p className="text-sm">
                  {selectedRequest?.startDate} {selectedRequest?.endDate ? `to ${selectedRequest.endDate}` : ''}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Tech Stack</Label>
                <p className="text-sm">{selectedRequest?.techStack}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Vendor</Label>
                <p className="text-sm">{selectedRequest?.vendor}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">No of Resources</Label>
                <p className="text-sm">{selectedRequest?.noOfResources}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Status</Label>
                <p className="text-sm">{selectedRequest?.status}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="text-sm font-medium">Comments</Label>
                <p className="text-sm">{selectedRequest?.comments}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}