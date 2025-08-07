"use client"

import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { formatNumber, roundUpToNearestFive, totalPrice, addPercentage } from "@/utility/utilityFunction";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"

export default function index() {

  const [price, setPrice] = useState(0)
  const [roundUp, setRoundUp] = useState(false)
  const [packagingPercent, setPackagingPercent] = useState(12)
  const [coloringPercent, setColoringPercent] = useState(15)
  const [toolsPercent, setToolsPercent] = useState(25)

  const [rows, setRows] = useState(
    Array.from({ length: 8 }, () => ({
      height: '',
      width: '',
      amount: 0,
    }))
  );

  const handleInputChange = (index, field, value) => {
    setRows(prevRows => {
      const newRows = [...prevRows];

      if (!newRows[index]) return prevRows;

      newRows[index][field] = value;

      const height = parseFloat(newRows[index].height);
      const width = parseFloat(newRows[index].width);
      const unitPrice = parseFloat(price);

      if (!isNaN(height) && !isNaN(width) && !isNaN(unitPrice)) {
        newRows[index].amount = height * width * unitPrice;
      } else {
        newRows[index].amount = 0;
      }

      return newRows;
    });
  };

  return (
    <div className="border border-black/50 rounded-lg" dir="rtl">
      {/* top */}
      <div className="p-3 border-b border-black flex gap-5 items-center">
        {/* rows */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        {/* price */}
        <div className="flex gap-3 items-center">
          <Label htmlFor="price">قیمت</Label>
          <Input name="price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="قیمت" className="w-[200px]" />
        </div>
        {/* round */}
        <div className="flex gap-3 items-center">
          <Label htmlFor="round">رند کردن اعداد</Label>
          <Checkbox onCheckedChange={(checked) => { return checked ? setRoundUp(true) : setRoundUp(false) }} name="round" id="terms-2" />
        </div>
      </div>
      {/* bottom */}
      <Table >
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="w-[50px] border-l pr-5">{index + 1}</TableCell>

              <TableCell className="w-[100px] pr-3">
                <Input placeholder="طول" onChange={(e) => handleInputChange(index, 'height', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'height', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'height', e.target.value)} value={row.height} />
              </TableCell>
              <TableCell className="w-[100px] border-l pl-3">
                <Input placeholder="عرض" onChange={(e) => handleInputChange(index, 'width', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'width', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'width', e.target.value)} value={row.width} />
              </TableCell>
              <TableCell className="text-right">
                <Input readOnly placeholder="مبلغ" value={formatNumber(row.amount) + '  تومان'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>مبلغ بدون احتساب</TableCell>
            <TableCell className="text-right">
              {formatNumber(totalPrice(rows))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ با احتساب ابزار
              <span className="mr-2">({toolsPercent}%)</span>
            </TableCell>
            <TableCell className="text-right">
              {formatNumber(addPercentage(totalPrice(rows), toolsPercent))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
