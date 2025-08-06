import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function index() {

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
      const unitPrice = parseFloat(1000000);

      if (!isNaN(height) && !isNaN(width) && !isNaN(unitPrice)) {
        newRows[index].amount = height * width * unitPrice;
      } else {
        newRows[index].amount = 0;
      }

      return newRows;
    });
  };

  return (
    <div>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ردیف</TableHead>
            <TableHead className="w-[100px]">طول</TableHead>
            <TableHead>عرض</TableHead>
            <TableHead className="text-right">ملبغ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index+1}</TableCell>

              <TableCell className="w-[100px]">
                <Input placeholder="طول" onChange={(e) => handleInputChange(index, 'height', e.target.value)} value={row.height} type="number" />
              </TableCell>
              <TableCell className="w-[100px]">
                <Input placeholder="عرض" onChange={(e) => handleInputChange(index, 'width', e.target.value)} value={row.width} type="number" />
              </TableCell>
              <TableCell className="text-right ">
                <Input readOnly placeholder="مبلغ" value={row.amount} type="number" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>مبلغ کل</TableCell>
            <TableCell className="text-right">گوز</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
