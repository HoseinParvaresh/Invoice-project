"use client"

import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { formatNumber, roundUpToNearestFive, totalPrice, addPercentage, totalAmountExcludingTax } from "@/utility/utilityFunction";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function index() {

  const [rowCount, setRowCount] = useState(21)

  const [price, setPrice] = useState(0)

  const [roundUp, setRoundUp] = useState(false)

  const [tax, setTax] = useState(3)

  const [packagingPercent, setPackagingPercent] = useState(12)
  const [coloringPercent, setColoringPercent] = useState(15)
  const [toolsPercent, setToolsPercent] = useState(25)

  const [packaging, setPackaging] = useState(true)
  const [coloring, setColoring] = useState(true)
  const [tools, setTools] = useState(true)


  const [rows, setRows] = useState(
    Array.from({ length: rowCount }, () => ({
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
  const handleRowCountChange = (newCount) => {
    setRows(prevRows => {
      const currentLength = prevRows.length;
  
      if (newCount > currentLength) {
        const extraRows = Array.from({ length: newCount - currentLength }, () => ({
          height: '',
          width: '',
          amount: 0,
        }));
        return [...prevRows, ...extraRows];
      } else {
        return prevRows.slice(0, newCount);
      }
    });
  };
  
  return (
    <div className="border border-black/50 rounded-lg" dir="rtl">
      {/* top */}
      <div className="p-3 border-b border-black flex gap-7 items-center">
        {/* rows */}
        <div className="flex gap-3 items-center">
          <Label htmlFor="rowCount">تعداد ردیف ها</Label>
          <Select name="rowCount" dir="rtl" onValueChange={(value) => {
            setRowCount(value)
            handleRowCountChange(value)
          }} value={`${rowCount}`}>
            <SelectTrigger className="w-[70px]" >
              <SelectValue placeholder={rowCount} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="font-dana">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* price */}
        <div className="flex gap-3 items-center">
          <Label htmlFor="price">قیمت</Label>
          <Input name="price" onChange={(e) => setPrice(Number(e.target.value.replace(/,/g, '')))} value={formatNumber(price)} placeholder="قیمت" className="w-[200px]" />
        </div>
        {/* round */}
        <div className="flex gap-3 items-center">
          <Label htmlFor="round">رند کردن اعداد</Label>
          <Checkbox onCheckedChange={(checked) => { return checked ? setRoundUp(true) : setRoundUp(false) }} name="round" id="terms-2" />
        </div>
      </div>
      {/* bottom */}
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="w-[50px] border-l pr-5">{index + 1}</TableCell>

              <TableCell className="w-[100px] pr-3">
                <Input placeholder="طول" onChange={(e) => handleInputChange(index, 'height', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'height', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'height', (e.target.value))} value={row.height} />
              </TableCell>
              <TableCell className="w-[100px] border-l pl-3">
                <Input placeholder="عرض" onChange={(e) => handleInputChange(index, 'width', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'width', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'width', (e.target.value))} value={row.width} />
              </TableCell>
              <TableCell className="text-right">
                <Input readOnly tabIndex={-1} placeholder="مبلغ" value={formatNumber(row.amount) + '  تومان'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* Amount excluding */}
          <TableRow>
            <TableCell colSpan={3}>مبلغ بدون احتساب</TableCell>
            <TableCell className="text-right">
              {formatNumber(totalPrice(rows))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including tools */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ با احتساب ابزار
              <span className="mr-2">(%{toolsPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {addPercentage(totalPrice(rows), toolsPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including packing */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ با احتساب بسته بندی
              <span className="mr-2">(%{packagingPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {addPercentage(totalPrice(rows), packagingPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including coloring */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ با احتساب  رنگ
              <span className="mr-2">(%{coloringPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {addPercentage(totalPrice(rows), coloringPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* total Amount Excluding Tax */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ کل بدون احتساب مالیات
            </TableCell>
            <TableCell className="text-right">
              {formatNumber(totalAmountExcludingTax(packaging, coloring, tools, packagingPercent, coloringPercent, toolsPercent, totalPrice(rows)))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* total Amount include Tax */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ کل با احتساب مالیات
              <span className="mr-2">(%{tax})</span>
            </TableCell>
            <TableCell className="text-right">
              {addPercentage(totalAmountExcludingTax(packaging, coloring, tools, packagingPercent, coloringPercent, toolsPercent, totalPrice(rows)), tax)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
