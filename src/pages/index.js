"use client"

import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { formatNumber, roundUpToNearestFive, totalPrice, addPercentage, calcTotalAmount } from "@/utility/utilityFunction";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/utility/ModeToggle";
import { calculatePercent } from "@/utility/utilityFunction";

export default function index() {

  const [rowCount, setRowCount] = useState(20)

  const [price, setPrice] = useState(0)

  const [roundUp, setRoundUp] = useState(false)

  const [rent, setRent] = useState(0)

  const [packagingPercent, setPackagingPercent] = useState(3)
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
        newRows[index].amount = (height * width * unitPrice) / 10000;
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
    <div className="border border-black/50 dark:border-white/40 rounded-lg" dir="rtl">
      {/* top */}
      <div className="p-3 border-b border-black dark:border-white/40 flex flex-col gap-8">
        {/* top */}
        <div className="flex gap-7">
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
          {/* tools */}
          <div className="flex gap-3 items-center">
            <Label htmlFor="round">محاسبه ابزار</Label>
            <Checkbox checked={tools} onCheckedChange={(checked) => setTools(checked)} name="tools" />
          </div>
          {/* packing */}
          <div className="flex gap-3 items-center">
            <Label htmlFor="round">محاسبه بسته بندی</Label>
            <Checkbox checked={packaging} onCheckedChange={(checked) => setPackaging(checked)} name="packing" />
          </div>
          {/* color */}
          <div className="flex gap-3 items-center">
            <Label htmlFor="round">محاسبه رنگ</Label>
            <Checkbox checked={coloring} onCheckedChange={(checked) => setColoring(checked)} name="color" />
          </div>
        </div>
        {/* bottom */}
        <div className="flex gap-7">
          {/* round */}
          <div className="flex gap-2 items-center">
            <Label htmlFor="round">رند کردن اعداد</Label>
            <Checkbox onCheckedChange={(checked) => { return checked ? setRoundUp(true) : setRoundUp(false) }} name="round" id="terms-2" />
          </div>
          {/* tools percent */}
          <div className="flex gap-2 items-center">
            <Label htmlFor="toolsPercent">درصد ابزار</Label>
            <Input name="toolsPercent" onChange={(e) => setToolsPercent(Number(e.target.value))} value={toolsPercent} placeholder="" className="w-[50px]" />
          </div>
          {/* packing percent */}
          <div className="flex gap-2 items-center">
            <Label htmlFor="packingPercent">درصد بسته بندی</Label>
            <Input name="packingPercent" onChange={(e) => setPackagingPercent(Number(e.target.value))} value={packagingPercent} placeholder="" className="w-[50px]" />
          </div>
          {/* coloring percent */}
          <div className="flex gap-3 items-center">
            <Label htmlFor="colorPercent">درصد رنگ</Label>
            <Input name="colorPercent" onChange={(e) => setColoringPercent(Number(e.target.value))} value={coloringPercent} placeholder="" className="w-[50px]" />
          </div>
          {/* dark mode button */}
          <ModeToggle/>
        </div>
      </div>
      {/* center and bottom */}
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
          <TableRow className={`${tools ? 'span' : 'hidden'}`}>
            <TableCell colSpan={3}>
              نرخ ابزار
              <span className="mr-2">(%{toolsPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {/* {addPercentage(totalPrice(rows), toolsPercent)} */}
              {calculatePercent(totalPrice(rows),toolsPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including coloring */}
          <TableRow className={`${coloring ? 'span' : 'hidden'}`}>
            <TableCell colSpan={3}>
              نرخ رنگ
              <span className="mr-2">(%{coloringPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {/* {addPercentage(totalPrice(rows), coloringPercent)} */}
              {calculatePercent(totalPrice(rows),coloringPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including packing */}
          <TableRow className={`${packaging ? 'span' : 'hidden'}`}>
            <TableCell colSpan={3}>
              نرخ بسته بندی
              <span className="mr-2">(%{packagingPercent})</span>
            </TableCell>
            <TableCell className="text-right">
              {/* {addPercentage(totalPrice(rows), packagingPercent)} */}
              {calculatePercent(totalPrice(rows),packagingPercent)}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Rent Amount */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ کرایه
            </TableCell>
            <TableCell className="text-right">
              <Input name="rent" onChange={(e) => setRent(Number(e.target.value.replace(/,/g, '')))} value={formatNumber(rent)} placeholder="کرایه" className="w-[200px]" />
            </TableCell>
          </TableRow>
          {/* total Amount */}
          <TableRow>
            <TableCell colSpan={3}>
              مبلغ کل
            </TableCell>
            <TableCell className="text-right">
              {formatNumber(calcTotalAmount(packaging, coloring, tools, packagingPercent, coloringPercent, toolsPercent, rent, totalPrice(rows)))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
