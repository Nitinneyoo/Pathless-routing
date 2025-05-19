import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

interface FilterState {
  type1: boolean;
  type2: boolean;
  type3: boolean;
  node1: boolean;
  node2: boolean;
  node3: boolean;
}

const RobotFilterPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    type1: false,
    type2: false,
    type3: false,
    node1: false,
    node2: false,
    node3: false,
  });
  const [isOpen, setIsOpen] = useState(false); // Explicitly control popover open state

  const handleCheckboxChange = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = () => {
    // Close the popover
    setIsOpen(false);

    // Navigate based on selected filters
    // Prioritize Type filters first, then Node filters
    if (filters.type1) {
      navigate({ to: "/robots/autonomous" });
    } else if (filters.type2) {
      navigate({ to: "/robots/manual" });
    } else if (filters.type3) {
      navigate({ to: "/robots/hybrid" });
    } else if (filters.node1) {
      navigate({ to: "/nodes/warehouse" });
    } else if (filters.node2) {
      navigate({ to: "/nodes/depot" });
    } else if (filters.node3) {
      navigate({ to: "/nodes/hub" });
    }
    // If no filters are selected, do nothing (stay on the page)
  };

  return (
    <div className="w-fit">
      <div className="max-w-7xl overflow-x-hidden">
        <div className="  rounded-sm overflow-hidden border border-gray-200 shadow-md">
          <div className="flex flex-col items-start">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-black font-semibold py-2 px-4 rounded-md border border-gray-300 cursor-pointer"
                  onClick={() => setIsOpen(true)} // Open popover on click
                >
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 max-w-[90vw] p-3 bg-white rounded-md shadow-lg border border-gray-300"
                sideOffset={3}
                align="end"
              >
                <div className="space-y-3">
                  <div className="flex space-x-6">
                    {/* Type Category */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 justify-center flex">Type</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type1"
                            checked={filters.type1}
                            onCheckedChange={() => handleCheckboxChange("type1")}
                          />
                          <label htmlFor="type1" className="text-sm">
                            Autonomous
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type2"
                            checked={filters.type2}
                            onCheckedChange={() => handleCheckboxChange("type2")}
                          />
                          <label htmlFor="type2" className="text-sm">
                            Manual
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type3"
                            checked={filters.type3}
                            onCheckedChange={() => handleCheckboxChange("type3")}
                          />
                          <label htmlFor="type3" className="text-sm">
                            Hybrid
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Node Category */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex justify-center">Node</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="node1"
                            checked={filters.node1}
                            onCheckedChange={() => handleCheckboxChange("node1")}
                          />
                          <label htmlFor="node1" className="text-sm">
                            Warehouse
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="node2"
                            checked={filters.node2}
                            onCheckedChange={() => handleCheckboxChange("node2")}
                          />
                          <label htmlFor="node2" className="text-sm">
                            Depot
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="node3"
                            checked={filters.node3}
                            onCheckedChange={() => handleCheckboxChange("node3")}
                          />
                          <label htmlFor="node3" className="text-sm">
                            Hub
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Reset and Select Buttons */}
                  <div className="flex justify-end space-x-2 pt-3">
                    <Button
                      variant="outline"
                      className="text-sm"
                      onClick={() =>
                        setFilters({
                          type1: false,
                          type2: false,
                          type3: false,
                          node1: false,
                          node2: false,
                          node3: false,
                        })
                      }
                    >
                      Reset
                    </Button>
                    <Button
                      variant="default"
                      className="text-sm"
                      onClick={handleSelect} // Updated to handle navigation
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {/* Show selected filters below */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotFilterPage;

export const Route = createFileRoute("/Dashboard/FilterComponent/robotFilter")({
  component: RobotFilterPage,
});