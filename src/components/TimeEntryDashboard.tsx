import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react";

interface WorkPackage {
  id: string;
  code: string;
  name: string;
  taxArea: string;
  taxAreaName: string;
  sum: string;
  hours: { [key: string]: string };
}

const TimeEntryDashboard = () => {
  const [activeTab, setActiveTab] = useState("timeEntry");
  const [weekStart] = useState("10/13/2025");
  const [weekEnd] = useState("10/17/2025");
  
  const [workPackages, setWorkPackages] = useState<WorkPackage[]>([
    {
      id: "1",
      code: "US00011000.1.1",
      name: "Global G&A Code",
      taxArea: "207",
      taxAreaName: "California – Los Angeles",
      sum: "24.00",
      hours: { mon: "8.00", tue: "8.00", wed: "8.00", thu: "", fri: "" }
    }
  ]);

  const [draftPackages, setDraftPackages] = useState<WorkPackage[]>([
    {
      id: "2",
      code: "US00011000.1.1",
      name: "Global G&A Code",
      taxArea: "207",
      taxAreaName: "California – Los Angeles",
      sum: "12.00",
      hours: { mon: "4.00", tue: "4.00", wed: "4.00", thu: "", fri: "" }
    },
    {
      id: "3",
      code: "US00044000.8.1",
      name: "Project ABC",
      taxArea: "207",
      taxAreaName: "California – Los Angeles",
      sum: "12.00",
      hours: { mon: "4.00", tue: "4.00", wed: "4.00", thu: "", fri: "" }
    }
  ]);

  const dates = [
    { label: "10/13", day: "Mon", key: "mon" },
    { label: "10/14", day: "Tue", key: "tue" },
    { label: "10/15", day: "Wed", key: "wed" },
    { label: "10/16", day: "Thu", key: "thu" },
    { label: "10/17", day: "Fri", key: "fri" }
  ];

  const handleHourChange = (packageId: string, dateKey: string, value: string, isDraft: boolean) => {
    const updatePackages = isDraft ? setDraftPackages : setWorkPackages;
    const packages = isDraft ? draftPackages : workPackages;
    
    updatePackages(
      packages.map(pkg => {
        if (pkg.id === packageId) {
          const newHours = { ...pkg.hours, [dateKey]: value };
          const sum = Object.values(newHours).reduce((acc, h) => acc + (parseFloat(h) || 0), 0).toFixed(2);
          return { ...pkg, hours: newHours, sum };
        }
        return pkg;
      })
    );
  };

  const handleFieldChange = (packageId: string, field: keyof WorkPackage, value: string, isDraft: boolean) => {
    const updatePackages = isDraft ? setDraftPackages : setWorkPackages;
    const packages = isDraft ? draftPackages : workPackages;
    
    updatePackages(
      packages.map(pkg => pkg.id === packageId ? { ...pkg, [field]: value } : pkg)
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-card border-2 border-primary rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Partner: John Doe</div>
              <div className="text-sm text-muted-foreground">EC: Jane Doe</div>
            </div>
          </div>
          <User className="w-12 h-12 text-primary" />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            2
          </div>
          {["Time Entry", "Calendar Management", "Expense Processing", "Travel Management"].map((tab) => (
            <Button
              key={tab}
              variant={tab === "Time Entry" ? "default" : "outline"}
              onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
              className="rounded-full"
            >
              {tab}
            </Button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search" className="w-48" />
          </div>
        </div>

        {/* Time Entry Section */}
        <div className="space-y-6">
          {/* Section Marker */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <h2 className="text-xl font-semibold">Time Entry</h2>
          </div>

          {/* Previous Week - Current Timesheet */}
          <div className="border border-table-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-table-header px-4 py-2">
              <div className="flex items-center gap-2 text-orange-600">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Previous Week</span>
              </div>
              <span className="font-semibold">
                Timesheet for the week of : {weekStart} – {weekEnd}
              </span>
              <div className="flex items-center gap-2 text-orange-600">
                <span className="font-semibold">Next Week</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header border-b border-table-border">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Work Package</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Work Package Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Tax Area</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Tax Area Name</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Sum</th>
                    {dates.map(date => (
                      <th key={date.key} className="px-4 py-2 text-center text-sm font-semibold">
                        <div>{date.label}</div>
                        <div className="font-normal text-xs">{date.day}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workPackages.map(pkg => (
                    <tr key={pkg.id} className="border-b border-table-border">
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.code}
                          onChange={(e) => handleFieldChange(pkg.id, "code", e.target.value, false)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.name}
                          onChange={(e) => handleFieldChange(pkg.id, "name", e.target.value, false)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.taxArea}
                          onChange={(e) => handleFieldChange(pkg.id, "taxArea", e.target.value, false)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box w-20"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.taxAreaName}
                          onChange={(e) => handleFieldChange(pkg.id, "taxAreaName", e.target.value, false)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2 text-center font-semibold">{pkg.sum}</td>
                      {dates.map(date => (
                        <td key={date.key} className="px-4 py-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={pkg.hours[date.key]}
                            onChange={(e) => handleHourChange(pkg.id, date.key, e.target.value, false)}
                            className="bg-editable-box text-editable-box-foreground border-editable-box w-20 text-center"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-table-header font-semibold">
                    <td colSpan={4} className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-center">
                      {workPackages.reduce((acc, pkg) => acc + parseFloat(pkg.sum), 0).toFixed(2)}
                    </td>
                    {dates.map(date => (
                      <td key={date.key} className="px-4 py-2 text-center">
                        {workPackages.reduce((acc, pkg) => acc + (parseFloat(pkg.hours[date.key]) || 0), 0).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Proposed Draft */}
          <div className="border border-table-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-table-header px-4 py-2">
              <div className="flex items-center gap-2 text-orange-600">
                <ChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Previous Week</span>
              </div>
              <span className="font-semibold">
                Proposed Draft for the week of : {weekStart} – {weekEnd}
              </span>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="text-orange-600">Next Week</Button>
                <Button variant="outline" size="sm" className="text-orange-600">Copy from last week</Button>
                <Button variant="outline" size="sm" className="text-orange-600">Add Line</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header border-b border-table-border">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Work Package</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Work Package Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Tax Area</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Tax Area Name</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold">Sum</th>
                    {dates.map(date => (
                      <th key={date.key} className="px-4 py-2 text-center text-sm font-semibold">
                        <div>{date.label}</div>
                        <div className="font-normal text-xs">{date.day}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {draftPackages.map(pkg => (
                    <tr key={pkg.id} className="border-b border-table-border">
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.code}
                          onChange={(e) => handleFieldChange(pkg.id, "code", e.target.value, true)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.name}
                          onChange={(e) => handleFieldChange(pkg.id, "name", e.target.value, true)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.taxArea}
                          onChange={(e) => handleFieldChange(pkg.id, "taxArea", e.target.value, true)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box w-20"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={pkg.taxAreaName}
                          onChange={(e) => handleFieldChange(pkg.id, "taxAreaName", e.target.value, true)}
                          className="bg-editable-box text-editable-box-foreground border-editable-box"
                        />
                      </td>
                      <td className="px-4 py-2 text-center font-semibold">{pkg.sum}</td>
                      {dates.map(date => (
                        <td key={date.key} className="px-4 py-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={pkg.hours[date.key]}
                            onChange={(e) => handleHourChange(pkg.id, date.key, e.target.value, true)}
                            className="bg-editable-box text-editable-box-foreground border-editable-box w-20 text-center"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-table-header font-semibold">
                    <td colSpan={4} className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-center">
                      {draftPackages.reduce((acc, pkg) => acc + parseFloat(pkg.sum), 0).toFixed(2)}
                    </td>
                    {dates.map(date => (
                      <td key={date.key} className="px-4 py-2 text-center">
                        {draftPackages.reduce((acc, pkg) => acc + (parseFloat(pkg.hours[date.key]) || 0), 0).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-4 p-4">
              <Button variant="outline">Edit</Button>
              <Button variant="default">Approve & Submit</Button>
            </div>
          </div>

          {/* AI Generated Notes */}
          <div className="border border-table-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                5
              </div>
              <h3 className="text-lg font-semibold">AI-Generated Notes & Actions</h3>
              <span className="text-sm text-muted-foreground">(Last Refresh Date : 10/15/2025)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Notes</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                      5
                    </div>
                    <p className="text-sm">Weekly draft will be ready for review on 17th October 2024 (Friday) by 5 PM ET.</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Actions Taken</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                      6
                    </div>
                    <p className="text-sm">Submitted 8 hours in Global G&A Code for 15th October 2025 for tax area 207 (California – Los Angeles)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeEntryDashboard;