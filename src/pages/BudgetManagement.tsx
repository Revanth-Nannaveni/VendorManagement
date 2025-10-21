// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts";
// import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

// const monthlyData = [
//   { month: "Jan", plannedCost: 120000, actualCost: 115000, plannedHours: 1600, actualHours: 1550 },
//   { month: "Feb", plannedCost: 120000, actualCost: 122000, plannedHours: 1600, actualHours: 1620 },
//   { month: "Mar", plannedCost: 120000, actualCost: 118000, plannedHours: 1600, actualHours: 1580 },
//   { month: "Apr", plannedCost: 120000, actualCost: 120000, plannedHours: 1600, actualHours: 1600 },
//   { month: "May", plannedCost: 120000, actualCost: 125000, plannedHours: 1600, actualHours: 1650 },
//   { month: "Jun", plannedCost: 120000, actualCost: 121000, plannedHours: 1600, actualHours: 1590 },
//   { month: "Jul", plannedCost: 120000, actualCost: 119500, plannedHours: 1600, actualHours: 1580 },
//   { month: "Aug", plannedCost: 120000, actualCost: 122300, plannedHours: 1600, actualHours: 1640 },
//   { month: "Sep", plannedCost: 120000, actualCost: 118900, plannedHours: 1600, actualHours: 1570 },
//   { month: "Oct", plannedCost: 120000, actualCost: 120700, plannedHours: 1600, actualHours: 1605 },
//   { month: "Nov", plannedCost: 120000, actualCost: 119000, plannedHours: 1600, actualHours: 1590 },
//   { month: "Dec", plannedCost: 120000, actualCost: 122000, plannedHours: 1600, actualHours: 1620 },
// ];

// const budgetData = [
//   { name: "Spent", value: 600000, color: "hsl(var(--primary))" },
//   { name: "Forecast", value: 120000, color: "hsl(var(--accent))" },
//   { name: "Remaining", value: 80000, color: "hsl(var(--muted))" },
// ];

// const projectDetails = [
//   { project: "Project Alpha", budget: 300000, spent: 180000, forecast: 50000, variance: 70000 },
//   { project: "Project Beta", budget: 250000, spent: 200000, forecast: 40000, variance: 10000 },
//   { project: "Project Gamma", budget: 250000, spent: 220000, forecast: 30000, variance: 0 },
// ];

// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function BudgetManagement() {
//   const [filters, setFilters] = useState({
//     project: "all",
//     lead: "all",
//     workstream: "all",
//     month: "all",
//   });
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");

//   // ✅ Automatically show data for the last completed month
//   useEffect(() => {
//     const today = new Date();
//     const lastMonthIndex = today.getMonth() - 1 >= 0 ? today.getMonth() - 1 : 11;
//     const lastMonthName = monthNames[lastMonthIndex];
//     setSelectedMonth(lastMonthName);
//     const monthData = monthlyData.filter((d) => d.month === lastMonthName);
//     setFilteredData(monthData);
//     setFilters((prev) => ({ ...prev, month: lastMonthName.toLowerCase() }));
//   }, []);

//   const handleMonthChange = (val: string) => {
//     setFilters({ ...filters, month: val });
//     if (val === "all") {
//       setFilteredData(monthlyData);
//       setSelectedMonth("All Months");
//     } else {
//       const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
//       setSelectedMonth(monthName);
//       const monthData = monthlyData.filter((d) => d.month.toLowerCase() === val);
//       setFilteredData(monthData);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Budget Management</h1>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Project */}
//             <div className="space-y-2">
//               <Label>Project</Label>
//               <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Projects</SelectItem>
//                   <SelectItem value="project-a">Project Alpha</SelectItem>
//                   <SelectItem value="project-b">Project Beta</SelectItem>
//                   <SelectItem value="project-c">Project Gamma</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Lead */}
//             <div className="space-y-2">
//               <Label>Lead</Label>
//               <Select value={filters.lead} onValueChange={(val) => setFilters({ ...filters, lead: val })}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Leads</SelectItem>
//                   <SelectItem value="lead-1">John Smith</SelectItem>
//                   <SelectItem value="lead-2">Sarah Johnson</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Workstream */}
//             <div className="space-y-2">
//               <Label>Workstream</Label>
//               <Select value={filters.workstream} onValueChange={(val) => setFilters({ ...filters, workstream: val })}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Workstreams</SelectItem>
//                   <SelectItem value="ws-1">Digital Transformation</SelectItem>
//                   <SelectItem value="ws-2">Cloud Migration</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Month */}
//             <div className="space-y-2">
//               <Label>Month</Label>
//               <Select value={filters.month} onValueChange={handleMonthChange}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Months</SelectItem>
//                   {monthNames.map((m) => (
//                     <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$800,000</div>
//             <p className="text-xs text-muted-foreground mt-1">Allocated for FY 2025-26</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$600,000</div>
//             <p className="text-xs text-muted-foreground mt-1">75% of budget</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Overall Variance</CardTitle>
//             <TrendingDown className="h-4 w-4 text-destructive" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-destructive">-$20,000</div>
//             <p className="text-xs text-muted-foreground mt-1">Over budget this quarter</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Bar Graphs Side by Side */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Planned vs Actual Hours */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="plannedHours" fill="#6366f1" name="Planned Hours" barSize={25} />
//                 <Bar dataKey="actualHours" fill="#f59e0b" name="Actual Hours" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Planned vs Actual Cost */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Planned vs Actual Cost ({selectedMonth})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={filteredData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                 <Legend />
//                 <Bar dataKey="plannedCost" fill="#10b981" name="Planned Cost" barSize={25} />
//                 <Bar dataKey="actualCost" fill="#ef4444" name="Actual Cost" barSize={25} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Budget Pie */}
//       {/* <Card>
//         <CardHeader>
//           <CardTitle>Budget Spent vs Forecast</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={budgetData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {budgetData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card> */}

// <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
//   <CardHeader className="text-center">
//     <CardTitle className="text-lg font-semibold text-primary">
//       Budget Spent vs Forecast
//     </CardTitle>
//   </CardHeader>
//   <CardContent>
//     <div className="flex flex-col items-center justify-center">
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={budgetData}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             outerRadius={100}
//             dataKey="value"
//           >
//             {budgetData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={
//                   index === 0
//                     ? "#4CAF50" // Spent - Green
//                     : index === 1
//                     ? "#FF9800" // Forecast - Orange
//                     : "#9E9E9E" // Remaining - Grey
//                 }
//                 stroke="#fff"
//                 strokeWidth={2}
//               />
//             ))}
//           </Pie>
//           <Tooltip
//             formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
//             contentStyle={{
//               backgroundColor: "white",
//               borderRadius: "8px",
//               border: "1px solid #ddd",
//             }}
//           />
//         </PieChart>
//       </ResponsiveContainer>

//       {/* ✅ Custom Legend Below Chart */}
//       <div className="flex justify-center gap-6 mt-4">
//         {budgetData.map((entry, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <div
//               className="w-4 h-4 rounded-full"
//               style={{
//                 backgroundColor:
//                   index === 0
//                     ? "#4CAF50"
//                     : index === 1
//                     ? "#FF9800"
//                     : "#9E9E9E",
//               }}
//             ></div>
//             <span className="text-sm font-medium text-muted-foreground">
//               {entry.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </CardContent>
// </Card>


//       {/* Project Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Project Budget Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-2">Project</th>
//                 <th className="text-right py-2">Budget</th>
//                 <th className="text-right py-2">Spent</th>
//                 <th className="text-right py-2">Forecast</th>
//                 <th className="text-right py-2">Variance</th>
//                 <th className="text-right py-2">Variance %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projectDetails.map((proj) => (
//                 <tr key={proj.project} className="border-b">
//                   <td className="py-2">{proj.project}</td>
//                   <td className="text-right">${proj.budget.toLocaleString()}</td>
//                   <td className="text-right">${proj.spent.toLocaleString()}</td>
//                   <td className="text-right">${proj.forecast.toLocaleString()}</td>
//                   <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
//                     ${proj.variance.toLocaleString()}
//                   </td>
//                   <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
//                     {((proj.variance / proj.budget) * 100).toFixed(1)}%
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const monthlyData = [
  { month: "Jan", plannedCost: 120000, actualCost: 115000, plannedHours: 1600, actualHours: 1550 },
  { month: "Feb", plannedCost: 120000, actualCost: 122000, plannedHours: 1600, actualHours: 1620 },
  { month: "Mar", plannedCost: 120000, actualCost: 118000, plannedHours: 1600, actualHours: 1580 },
  { month: "Apr", plannedCost: 120000, actualCost: 120000, plannedHours: 1600, actualHours: 1600 },
  { month: "May", plannedCost: 120000, actualCost: 125000, plannedHours: 1600, actualHours: 1650 },
  { month: "Jun", plannedCost: 120000, actualCost: 121000, plannedHours: 1600, actualHours: 1590 },
  { month: "Jul", plannedCost: 120000, actualCost: 119500, plannedHours: 1600, actualHours: 1580 },
  { month: "Aug", plannedCost: 120000, actualCost: 122300, plannedHours: 1600, actualHours: 1640 },
  { month: "Sep", plannedCost: 120000, actualCost: 118900, plannedHours: 1600, actualHours: 1570 },
  { month: "Oct", plannedCost: 120000, actualCost: 120700, plannedHours: 1600, actualHours: 1605 },
  { month: "Nov", plannedCost: 120000, actualCost: 119000, plannedHours: 1600, actualHours: 1590 },
  { month: "Dec", plannedCost: 120000, actualCost: 122000, plannedHours: 1600, actualHours: 1620 },
];

const budgetData = [
  { name: "Spent", value: 600000, color: "#4CAF50" },
  { name: "Forecast", value: 120000, color: "#FF9800" },
  { name: "Remaining", value: 80000, color: "#9E9E9E" },
];

const projectDetails = [
  { project: "Project Alpha", budget: 300000, spent: 180000, forecast: 50000, variance: 70000 },
  { project: "Project Beta", budget: 250000, spent: 200000, forecast: 40000, variance: 10000 },
  { project: "Project Gamma", budget: 250000, spent: 220000, forecast: 30000, variance: 0 },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BudgetManagement() {
  const [filters, setFilters] = useState({
    project: "all",
    lead: "all",
    workstream: "all",
    month: "all",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // ✅ Show data for the current month
  useEffect(() => {
    const today = new Date();
    const currentMonthIndex = today.getMonth(); // Get current month index (0-11)
    const currentMonthName = monthNames[currentMonthIndex]; // Get current month name
    setSelectedMonth(currentMonthName); // Set the display month
    const monthData = monthlyData.filter((d) => d.month === currentMonthName); // Filter data for current month
    setFilteredData(monthData); // Update filtered data
    setFilters((prev) => ({ ...prev, month: currentMonthName.toLowerCase() })); // Update filters
  }, []);

  const handleMonthChange = (val: string) => {
    setFilters({ ...filters, month: val });
    if (val === "all") {
      setFilteredData(monthlyData);
      setSelectedMonth("All Months");
    } else {
      const monthName = val.charAt(0).toUpperCase() + val.slice(1, 3);
      setSelectedMonth(monthName);
      const monthData = monthlyData.filter((d) => d.month.toLowerCase() === val);
      setFilteredData(monthData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budget Management</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={filters.project} onValueChange={(val) => setFilters({ ...filters, project: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="project-a">Project Alpha</SelectItem>
                  <SelectItem value="project-b">Project Beta</SelectItem>
                  <SelectItem value="project-c">Project Gamma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Lead</Label>
              <Select value={filters.lead} onValueChange={(val) => setFilters({ ...filters, lead: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="lead-1">John Smith</SelectItem>
                  <SelectItem value="lead-2">Sarah Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Workstream</Label>
              <Select value={filters.workstream} onValueChange={(val) => setFilters({ ...filters, workstream: val })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Workstreams</SelectItem>
                  <SelectItem value="ws-1">Digital Transformation</SelectItem>
                  <SelectItem value="ws-2">Cloud Migration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={filters.month} onValueChange={handleMonthChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Months</SelectItem>
                  {monthNames.map((m) => (
                    <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$800,000</div>
            <p className="text-xs text-muted-foreground mt-1">Allocated for FY 2025-26</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$600,000</div>
            <p className="text-xs text-muted-foreground mt-1">75% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Variance</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">-$20,000</div>
            <p className="text-xs text-muted-foreground mt-1">Over budget this quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Graphs Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Hours ({selectedMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plannedHours" fill="#6366f1" name="Planned Hours" barSize={25} />
                <Bar dataKey="actualHours" fill="#f59e0b" name="Actual Hours" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planned vs Actual Cost ({selectedMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="plannedCost" fill="#10b981" name="Planned Cost" barSize={25} />
                <Bar dataKey="actualCost" fill="#ef4444" name="Actual Cost" barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Budget Spent vs Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#4CAF50" // Spent - Green
                          : index === 1
                          ? "#FF9800" // Forecast - Orange
                          : "#9E9E9E" // Remaining - Grey
                      }
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-6 mt-4">
              {budgetData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#4CAF50"
                          : index === 1
                          ? "#FF9800"
                          : "#9E9E9E",
                    }}
                  ></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Project</th>
                <th className="text-right py-2">Budget</th>
                <th className="text-right py-2">Spent</th>
                <th className="text-right py-2">Forecast</th>
                <th className="text-right py-2">Variance</th>
                <th className="text-right py-2">Variance %</th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.map((proj) => (
                <tr key={proj.project} className="border-b">
                  <td className="py-2">{proj.project}</td>
                  <td className="text-right">${proj.budget.toLocaleString()}</td>
                  <td className="text-right">${proj.spent.toLocaleString()}</td>
                  <td className="text-right">${proj.forecast.toLocaleString()}</td>
                  <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${proj.variance.toLocaleString()}
                  </td>
                  <td className={`text-right ${proj.variance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {((proj.variance / proj.budget) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}