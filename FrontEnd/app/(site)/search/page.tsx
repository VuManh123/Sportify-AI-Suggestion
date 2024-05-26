import SearchCategory from "@/components/CustomComponent/SearchCategory";
import Header from "@/components/Header/Header";
import { BiSearch } from "react-icons/bi";
export default function Search() {
    return (
        <div className="text-neutral-100 font-bold">
            <Header>
                <div className="mb-2 flex items-center relative ">
                    <BiSearch className="text-neutral-400 absolute left-3 top-6 z-30" size={26} />
                    <input type="text" className="w-96 rounded-full p-3 pl-12 absolute left-0 top-3" placeholder={`Bạn muốn tìm nội dung gì?`} />
                </div>
            </Header>
            <h3 className='ml-6 mt-16 mb-2'>Duyệt theo danh sách</h3>
            <div className="ml-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
                <SearchCategory />
            </div>
        </div>
    );
}