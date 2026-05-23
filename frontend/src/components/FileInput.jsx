import { Upload } from 'lucide-react';

export default function FileInput({ label, name, onChange, value }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-700 mb-2 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={(e) => onChange(name, e.target.files[0])}
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:border-purple-500/30 dark:hover:border-purple-400 dark:hover:bg-purple-900/30 dark:bg-gray-800/50"
        >
          <Upload className="w-5 h-5 text-purple-500 mr-2 dark:text-purple-400" />
          <span className="text-gray-700 dark:text-gray-300">
            {value ? value.name : 'Choose file...'}
          </span>
        </label>
      </div>
    </div>
  );
}
