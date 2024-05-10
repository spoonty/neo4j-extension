type TProps = {
  label: string
  value?: boolean
  onChange: (val: boolean) => void
}

export default function Toggle({ label, value = false, onChange }: TProps) {
  return (
    <div>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          defaultChecked={value}
          checked={value}
          className="peer sr-only"
          onChange={(event) => onChange(event.target.checked)}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-light-blue peer-checked:after:translate-x-full peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:bg-gray-700"></div>
        <span className="ms-3 text-[11px] font-medium text-main-gray">
          {label}
        </span>
      </label>
    </div>
  )
}
