import { Checkbox } from "../ui/checkbox";

const KeepLogin = () => {
  return (
    <div className="mb-4 mt-8 flex size-full items-center justify-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        로그인 상태 유지
      </label>
    </div>
  );
};

export default KeepLogin;
