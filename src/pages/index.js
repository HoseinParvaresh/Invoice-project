"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { formatNumber, roundUpToNearestFive, totalPrice, addPercentage, calcTotalAmount } from "@/utility/utilityFunction";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select"
import { calculatePercent, calcPackingPercent } from "@/utility/utilityFunction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

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

  const [fontSize, setFontsize] = useState("!text-lg")

  const [toggleMode, setToggleMode] = React.useState("light")

  const { setTheme } = useTheme()
  setTheme(toggleMode)

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
  const moveHandler = (e) => {
    const index = Number(e.target.id.slice(2))
    const word = e.target.id[0]

    if (e.code === 'ArrowLeft') {
      document.getElementById(`w-${index}`).focus();
    }
    if (e.code === 'ArrowRight') {
      document.getElementById(`h-${index}`).focus();
    }
    if (e.code === 'ArrowDown' && index + 1 < rowCount) {
      if (word === 'w') {
        document.getElementById(`w-${index + 1}`).focus();
      }
      if (word === 'h') {
        document.getElementById(`h-${index + 1}`).focus();
      }
    }
    if (e.code === 'ArrowUp' && index > 0) {
      if (word === 'w') {
        document.getElementById(`w-${index - 1}`).focus();
      }
      if (word === 'h') {
        document.getElementById(`h-${index - 1}`).focus();
      }
    }
  }

  return (
    <div className="border border-black/50 dark:border-white/40 rounded-lg" dir="rtl">
      {/* top */}
      <div className="p-3 border-b border-black dark:border-white/40 flex justify-between items-start">
        {/* right */}
        <div className="flex flex-col gap-8">
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
              <Input name="price" onChange={(e) => setPrice(Number(e.target.value.replace(/,/g, '')))} value={formatNumber(price)} placeholder="قیمت" className={`w-[200px] ${fontSize}`} />
            </div>
          </div>
          {/* center */}
          <div className="flex gap-7">
            {/* tools percent */}
            <div className="flex gap-2 items-center">
              <Label htmlFor="toolsPercent">درصد ابزار</Label>
              <Input name="toolsPercent" onChange={(e) => setToolsPercent(Number(e.target.value))} value={toolsPercent} placeholder="" className={`${fontSize === '!text-2xl' ? 'w-[60px]' : 'w-[50px]'} ${fontSize}`} />
            </div>
            {/* packing percent */}
            <div className="flex gap-2 items-center">
              <Label htmlFor="packingPercent">درصد بسته بندی</Label>
              <Input name="packingPercent" onChange={(e) => setPackagingPercent(Number(e.target.value))} value={packagingPercent} placeholder="" className={`${fontSize === '!text-2xl' ? 'w-[60px]' : 'w-[50px]'} ${fontSize}`} />
            </div>
            {/* coloring percent */}
            <div className="flex gap-3 items-center">
              <Label htmlFor="colorPercent">درصد رنگ</Label>
              <Input name="colorPercent" onChange={(e) => setColoringPercent(Number(e.target.value))} value={coloringPercent} placeholder="" className={`${fontSize === '!text-2xl' ? 'w-[60px]' : 'w-[50px]'} ${fontSize}`} />
            </div>
          </div>
          {/* bottom */}
          <div className="flex gap-7 mb-2">
            {/* round */}
            <div className="flex gap-2 items-center">
              <Label htmlFor="round">رند کردن اعداد</Label>
              <Checkbox onCheckedChange={(checked) => { return checked ? setRoundUp(true) : setRoundUp(false) }} name="round" id="terms-2" />
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
        </div>
        {/* left */}
        <div className="flex flex-col gap-5">
          <Dialog dir="rtl">
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">تنظیمات</Button>
              </DialogTrigger>
              <DialogContent dir="rtl" className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left font-dana">تنظیمات</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="flex gap-3">
                    <Label htmlFor="theme" className="font-dana">عوض کردن تم</Label>
                    <Button name="theme" variant="outline" size="icon" onClick={() => toggleMode === 'light' ? setToggleMode("dark") : setToggleMode("light")}>
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Label htmlFor="font" className="font-dana">تغییر فونت</Label>
                    <Select dir="rtl" name="font" onValueChange={(value) => {
                      setFontsize(value)
                    }} value={`${fontSize}`}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={fontSize} className="font-dana text-2xl" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="!text-base">16</SelectItem>
                          <SelectItem value="!text-lg">18</SelectItem>
                          <SelectItem value="!text-xl">20</SelectItem>
                          <SelectItem value="!text-2xl">24</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </form>
          </Dialog>
          {/* <Button className="h-12 text-base">ثبت</Button> */}
        </div>
      </div>
      {/* center and bottom */}
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={`w-[50px] border-l pr-5 ${fontSize}`}>{index + 1}</TableCell>

              <TableCell className="w-[100px] pr-3">
                <Input id={`h-${index}`} onKeyDown={moveHandler} className={`${fontSize} placeholder:text-sm`} placeholder="طول" onChange={(e) => handleInputChange(index, 'height', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'height', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'height', (e.target.value))} value={row.height} />
              </TableCell>
              <TableCell className="w-[100px] border-l pl-3">
                <Input id={`w-${index}`} onKeyDown={moveHandler} className={`${fontSize} placeholder:text-sm`} placeholder="عرض" onChange={(e) => handleInputChange(index, 'width', e.target.value)} onBlur={(e) => roundUp ? handleInputChange(index, 'width', roundUpToNearestFive(e.target.value)) : handleInputChange(index, 'width', (e.target.value))} value={row.width} />
              </TableCell>
              <TableCell className="text-right">
                <Input className={`${fontSize} placeholder:text-sm`} readOnly tabIndex={-1} placeholder="مبلغ" value={formatNumber(row.amount) + '  تومان'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* Amount excluding */}
          <TableRow>
            <TableCell className={`${fontSize}`} colSpan={3}>مبلغ بدون احتساب</TableCell>
            <TableCell className={`text-right ${fontSize}`}>
              {formatNumber(totalPrice(rows))}
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
          {/* Amount including tools */}
          <TableRow className={`${tools ? 'span' : 'hidden'}`}>
            <TableCell className={`${fontSize}`} colSpan={3}>
              نرخ ابزار
              <span className="mr-2">(%{toolsPercent})</span>
            </TableCell>
            <TableCell className={`text-right flex gap-20 ${fontSize}`}>
              <div>
                {
                  tools &&
                  formatNumber(calculatePercent(totalPrice(rows), toolsPercent))
                }
                <span className="mr-2">تومان</span>
              </div>
              <div className="flex">
                <p className={`${fontSize === '!text-2xl' ? 'w-[300px]' : 'w-[230px]'}`}>مبلغ با احتساب ابزار</p>
                <div>
                  {
                    tools &&
                    formatNumber(addPercentage(totalPrice(rows), toolsPercent))
                  }
                  <span className="mr-2">تومان</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {/* Amount including coloring */}
          <TableRow className={`${coloring ? 'span' : 'hidden'}`}>
            <TableCell className={`${fontSize}`} colSpan={3}>
              نرخ رنگ
              <span className="mr-2">(%{coloringPercent})</span>
            </TableCell>
            <TableCell className={`text-right flex gap-20 ${fontSize}`}>
              <div>
                {
                  tools ?
                    formatNumber(calculatePercent(addPercentage(totalPrice(rows), toolsPercent), coloringPercent)) :
                    coloring &&
                    formatNumber(calculatePercent(totalPrice(rows), coloringPercent))

                }
                <span className="mr-2">تومان</span>
              </div>
              <div className="flex">
                <p className={`${fontSize === '!text-2xl' ? 'w-[300px]' : 'w-[230px]'}`}>مبلغ با احتساب رنگ و ابزار</p>
                <div>
                  {
                    tools ?
                      formatNumber(Math.ceil(addPercentage(addPercentage(totalPrice(rows), toolsPercent), coloringPercent))) :
                      coloring &&
                      formatNumber(Math.ceil(addPercentage(totalPrice(rows), coloringPercent)))
                  }
                  <span className="mr-2">تومان</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {/* Amount including packing */}
          <TableRow className={`${packaging ? 'span' : 'hidden'}`}>
            <TableCell className={`${fontSize}`} colSpan={3}>
              نرخ بسته بندی
              <span className="mr-2">(%{packagingPercent})</span>
            </TableCell>
            <TableCell className={`text-right flex gap-20 ${fontSize}`}>
              <div>
                {
                  tools && coloring ?
                    formatNumber(Math.ceil(calculatePercent(addPercentage(addPercentage(totalPrice(rows), toolsPercent), coloringPercent), packagingPercent))) :
                    tools ?
                      formatNumber(Math.ceil(calculatePercent(addPercentage(totalPrice(rows), toolsPercent), packagingPercent))) :
                      coloring ?
                        formatNumber(Math.ceil(calculatePercent(addPercentage(totalPrice(rows), coloringPercent), packagingPercent))) :
                        packaging &&
                        formatNumber(Math.ceil(calculatePercent(totalPrice(rows), packagingPercent)))
                }
                <span className="mr-2">تومان</span>
              </div>
              <div className="flex">
                <p className={`${fontSize === '!text-2xl' ? 'w-[390px]' : '!text-xl' ? 'w-[350px]' : 'w-[290px]'}`}>مبلغ با احتساب بسته بندی و رنگ و ابزار</p>
                <div>
                  {
                    tools && coloring ?
                      formatNumber(Math.ceil(calcPackingPercent(addPercentage(addPercentage(totalPrice(rows), toolsPercent), coloringPercent), packagingPercent))) :
                      tools ?
                        formatNumber(Math.ceil(calcPackingPercent(addPercentage(totalPrice(rows), toolsPercent), packagingPercent))) :
                        coloring ?
                          formatNumber(Math.ceil(calcPackingPercent(addPercentage(totalPrice(rows), coloringPercent), packagingPercent))) :
                          packaging &&
                          formatNumber(Math.ceil(calcPackingPercent(totalPrice(rows), packagingPercent)))
                  }
                  <span className="mr-2">تومان</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {/* Rent Amount */}
          <TableRow>
            <TableCell className={`${fontSize}`} colSpan={3}>
              مبلغ کرایه
            </TableCell>
            <TableCell className="text-right">
              <Input name="rent" onChange={(e) => setRent(Number(e.target.value.replace(/,/g, '')))} value={formatNumber(rent)} placeholder="کرایه" className={`w-[200px] ${fontSize}`} />
            </TableCell>
          </TableRow>
          {/* total Amount */}
          <TableRow>
            <TableCell className={`${fontSize}`} colSpan={3}>
              مبلغ کل
            </TableCell>
            <TableCell className={`text-right ${fontSize}`}>
              {
                tools && coloring && packaging ?
                  formatNumber(Math.ceil(calcTotalAmount(calcPackingPercent(addPercentage(addPercentage(totalPrice(rows), toolsPercent), coloringPercent), packagingPercent), rent))) :
                  tools && coloring ?
                    formatNumber(Math.ceil(calcTotalAmount(addPercentage(addPercentage(totalPrice(rows), toolsPercent), coloringPercent), rent))) :
                    tools && packaging ?
                      formatNumber(Math.ceil(calcTotalAmount(addPercentage(addPercentage(totalPrice(rows), toolsPercent), packagingPercent), rent))) :
                      coloring && packaging ?
                        formatNumber(Math.ceil(calcTotalAmount(addPercentage(addPercentage(totalPrice(rows), coloringPercent), packagingPercent), rent))) :
                        tools ?
                          formatNumber(Math.ceil(calcTotalAmount(addPercentage(totalPrice(rows), toolsPercent), rent))) :
                          coloring ?
                            formatNumber(Math.ceil(calcTotalAmount(addPercentage(totalPrice(rows), coloringPercent), rent))) :
                            packaging ?
                              formatNumber(Math.ceil(calcTotalAmount(addPercentage(totalPrice(rows), packagingPercent), rent))) :
                              formatNumber(Math.ceil(calcTotalAmount(totalPrice(rows), rent)))
              }
              <span className="mr-2">تومان</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
