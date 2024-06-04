export default function AuthLayout({ children, title }) {
  return (
    <main className="p-12 bg-purple-600 min-h-screen flex justify-center items-center flex-col background">
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="font-bold text-4xl text-white title-class">
          <span>{title}</span>
        </div>
      </div>
      <div className="form-wrapper-width mx-auto bg-white border-[2px] border-black p-8 rounded-md">
        <div>{children}</div>
      </div>
      <div className="max-w-lg mx-auto p-8 mt-2 text-center">
        <div className="font-bold text-sm text-white text-shadow">
          © 2024 ContentBlocks. All rights reserved.
        </div>
      </div>
      <div className="fixed z-[999] transition group border-[1.5px] border-purple-500 ring ring-purple-500/10 flex items-center bottom-2 right-2  bg-white pt-1 pb-1 pl-1.5 pr-1.5 md:pr-3 rounded-md">
        <img
          src="https://upcdn.io/kW15bg4/raw/uploads/cb/Group%204%20(1).png"
          alt=""
          className="w-[130px] hidden md:block"
        />
        <img
          src="https://upcdn.io/kW15bg4/raw/uploads/2023/12/13/4kxkF2t721-cb-logo-icon.png"
          alt=""
          className="w-[30px] block md:hidden"
        />
      </div>
    </main>
  );
}
