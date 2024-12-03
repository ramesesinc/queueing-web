"use client";

import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type DataTableProps = {
  rows: Record<string, any>[];
  columns: string[];
  showCheckbox?: boolean;
  singleSelect?: boolean;
  onSelectRows?: (
    selectedRows: Record<string, any> | Record<string, any>[] | null
  ) => void;
};

const DataTable: React.FC<DataTableProps> = ({
  rows = [],
  columns = [],
  showCheckbox = false,
  singleSelect = false,
  onSelectRows,
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (onSelectRows) {
      const selectedData = singleSelect
        ? selectedRows.size > 0
          ? rows[Array.from(selectedRows)[0]]
          : null
        : Array.from(selectedRows).map((rowIndex) => rows[rowIndex]);

      onSelectRows(selectedData);
    }
  }, [selectedRows]);

  useEffect(() => {
    setSelectedRows(new Set());
  }, [rows]);

  const handleCheckboxChange = (rowIndex: number) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set<number>(prevSelected);
      if (singleSelect) {
        newSelected.clear();
        if (!prevSelected.has(rowIndex)) {
          newSelected.add(rowIndex);
        }
      } else {
        if (newSelected.has(rowIndex)) {
          newSelected.delete(rowIndex);
        } else {
          newSelected.add(rowIndex);
        }
      }
      return newSelected;
    });
  };

  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {showCheckbox && <TableCell className="border" />}
            {columns.map((column, index) => (
              <TableCell
                key={index}
                className="border"
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                }}
              >
                {column.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {rows && rows.length > 0 && (
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`cursor-pointer ${
                  selectedRows.has(rowIndex) ? "bg-pink-200" : ""
                } hover:bg-gray-200`}
                onClick={
                  showCheckbox
                    ? () => handleCheckboxChange(rowIndex)
                    : undefined
                }
              >
                {showCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.has(rowIndex)}
                      disableRipple
                    />
                  </TableCell>
                )}
                {columns.map((column, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="border"
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                        md: "1rem",
                      },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default DataTable;
