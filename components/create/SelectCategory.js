"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function SelectCategory() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue value={false} placeholder="No selectef value" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  );
}

export default SelectCategory;
