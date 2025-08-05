import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function Invoice() {
  const [unitPrice, setUnitPrice] = useState(0);
  const [rows, setRows] = useState(
    Array(8).fill({ width: "", height: "", amount: 0 })
  );
  const [options, setOptions] = useState({ tool: false, color: false, tax: false });

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    const w = parseFloat(updatedRows[index].width) || 0;
    const h = parseFloat(updatedRows[index].height) || 0;
    updatedRows[index].amount = parseFloat((w * h * unitPrice).toFixed(2));
    setRows(updatedRows);
  };

  const total = rows.reduce((acc, row) => acc + row.amount, 0);

  const totalWithExtras = total * (1 +
    (options.tool ? 0.25 : 0) +
    (options.color ? 0.1 : 0) +
    (options.tax ? 0.09 : 0));

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Settings className="w-6 h-6" />
        <Input
          type="number"
          placeholder="قیمت واحد (متر مربع)"
          onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
        />
        <Checkbox
          checked={options.tool}
          onCheckedChange={(val) => setOptions({ ...options, tool: val })}
        />
        <span>ابزار</span>
        <Checkbox
          checked={options.color}
          onCheckedChange={(val) => setOptions({ ...options, color: val })}
        />
        <span>رنگ</span>
        <Checkbox
          checked={options.tax}
          onCheckedChange={(val) => setOptions({ ...options, tax: val })}
        />
        <span>مالیات</span>
      </div>

      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-4 items-center gap-2">
          <Input
            type="number"
            placeholder="عرض"
            value={row.width}
            onChange={(e) => handleChange(i, "width", e.target.value)}
          />
          <Input
            type="number"
            placeholder="طول"
            value={row.height}
            onChange={(e) => handleChange(i, "height", e.target.value)}
          />
          <div className="col-span-1 text-center font-semibold">
            {row.amount.toLocaleString()} تومان
          </div>
          <div className="text-center text-sm text-gray-500">{i + 1}</div>
        </div>
      ))}

      <Card>
        <CardContent className="space-y-2 p-4">
          <div className="flex justify-between">
            <span>قیمت کل:</span>
            <span>{total.toLocaleString()} تومان</span>
          </div>
          <div className="flex justify-between">
            <span>قیمت با ابزار و موارد اضافه:</span>
            <span>{totalWithExtras.toLocaleString()} تومان</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
