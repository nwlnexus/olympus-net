export default function SettingsAccounts() {
  return (
    <div className='flex-1 xl:overflow-y-auto'>
      <div className='mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8'>
        <h1 className='text-blue-gray-900 text-3xl font-bold tracking-tight'>Account</h1>

        <form className='divide-y-blue-gray-200 mt-6 space-y-8 divide-y'>
          <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6'>
            <div className='sm:col-span-6'>
              <h2 className='text-blue-gray-900 text-xl font-medium'>Profile</h2>
              <p className='text-blue-gray-500 mt-1 text-sm'>
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='first-name' className='text-blue-gray-900 block text-sm font-medium'>
                First name
              </label>
              <input
                type='text'
                name='first-name'
                id='first-name'
                autoComplete='given-name'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='last-name' className='text-blue-gray-900 block text-sm font-medium'>
                Last name
              </label>
              <input
                type='text'
                name='last-name'
                id='last-name'
                autoComplete='family-name'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>

            <div className='sm:col-span-6'>
              <label htmlFor='username' className='text-blue-gray-900 block text-sm font-medium'>
                Username
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='border-blue-gray-300 bg-blue-gray-50 text-blue-gray-500 inline-flex items-center rounded-l-md border border-r-0 px-3 sm:text-sm'>
                  workcation.com/
                </span>
                <input
                  type='text'
                  name='username'
                  id='username'
                  autoComplete='username'
                  defaultValue='lisamarie'
                  className='border-blue-gray-300 text-blue-gray-900 block w-full min-w-0 flex-1 rounded-none rounded-r-md focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div className='sm:col-span-6'>
              <label htmlFor='photo' className='text-blue-gray-900 block text-sm font-medium'>
                Photo
              </label>
              <div className='mt-1 flex items-center'>
                <img
                  className='inline-block h-12 w-12 rounded-full'
                  src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80'
                  alt=''
                />
                <div className='ml-4 flex'>
                  <div className='border-blue-gray-300 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2'>
                    <label
                      htmlFor='user-photo'
                      className='text-blue-gray-900 pointer-events-none relative text-sm font-medium'
                    >
                      <span>Change</span>
                      <span className='sr-only'> user photo</span>
                    </label>
                    <input
                      id='user-photo'
                      name='user-photo'
                      type='file'
                      className='absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0'
                    />
                  </div>
                  <button
                    type='button'
                    className='text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:ring-offset-blue-gray-50 ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className='sm:col-span-6'>
              <label htmlFor='description' className='text-blue-gray-900 block text-sm font-medium'>
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  name='description'
                  rows={4}
                  className='border-blue-gray-300 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                  defaultValue={''}
                />
              </div>
              <p className='text-blue-gray-500 mt-3 text-sm'>
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            <div className='sm:col-span-6'>
              <label htmlFor='url' className='text-blue-gray-900 block text-sm font-medium'>
                URL
              </label>
              <input
                type='text'
                name='url'
                id='url'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6'>
            <div className='sm:col-span-6'>
              <h2 className='text-blue-gray-900 text-xl font-medium'>Personal Information</h2>
              <p className='text-blue-gray-500 mt-1 text-sm'>
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='email-address' className='text-blue-gray-900 block text-sm font-medium'>
                Email address
              </label>
              <input
                type='text'
                name='email-address'
                id='email-address'
                autoComplete='email'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='phone-number' className='text-blue-gray-900 block text-sm font-medium'>
                Phone number
              </label>
              <input
                type='text'
                name='phone-number'
                id='phone-number'
                autoComplete='tel'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='country' className='text-blue-gray-900 block text-sm font-medium'>
                Country
              </label>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              >
                <option />
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='language' className='text-blue-gray-900 block text-sm font-medium'>
                Language
              </label>
              <input
                type='text'
                name='language'
                id='language'
                className='border-blue-gray-300 text-blue-gray-900 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>

            <p className='text-blue-gray-500 text-sm sm:col-span-6'>
              This account was created on <time dateTime='2017-01-05T20:35:40'>January 5, 2017, 8:35:40 PM</time>.
            </p>
          </div>

          <div className='flex justify-end pt-8'>
            <button
              type='button'
              className='text-blue-gray-900 hover:bg-blue-gray-50 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
