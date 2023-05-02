function Header({ items } : { items: string[]}) {
    return ( 
        <>
            <div className="w-full flex flex-row justify-start bg-[#E5E5E5]">
                <select className="w-full bg-[#E5E5E5] h-[50px] text-titleColor text-[18px] font-[700] border">
                    {
                        items.map((item: string, index: number) => <option key={index} value={item}>{item}</option>)
                    }
                </select>
            </div>
        </>
    );
}

export default Header;