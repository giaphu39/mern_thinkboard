import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">ThinkBoard</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;


// 🔥 Tổng kết quy trình chuẩn

// Khi viết CSS cho bất kỳ component nào, hãy đi theo checklist này:

// 1️⃣ Layout (flex/grid)
// 2️⃣ Kích thước & spacing
// 3️⃣ Typography
// 4️⃣ Màu sắc & phân tầng
// 5️⃣ State (hover/focus/active)
// 6️⃣ Responsive
// 🎯 Những bước nào có thể bỏ?
// Trường hợp	Có thể bỏ
// Component nhỏ inline	Bỏ bước 2
// Không có text	Bỏ bước 3
// Không interactive	Bỏ bước 5
// Demo nội bộ	Có thể tạm bỏ bước 6

// tổng kết layer
// 1. Semantic wrapper
// 2. Container wrapper (giới hạn chiều rộng)
// 3. Layout wrapper (flex/grid)
// 4. Group wrapper (nếu cần)
