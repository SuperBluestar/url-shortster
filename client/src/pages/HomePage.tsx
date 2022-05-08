import { useState } from 'react';
import urlShortster from 'services/urlShortster';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [originalUrlError, setOriginalUrlError] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');
  const [registering, setRegistering] = useState<boolean>(false);
  const register = async () => {
    setRegistering(true);
    if (originalUrl.trim() === '') {
      setOriginalUrlError('originalUrl is necessary field');
    } else {
      setOriginalUrlError('');
      const { success, message } = await urlShortster.registerUrlCode({
        urlOriginal: originalUrl.trim(),
        urlCode: shortCode.trim()
      });
      if (success) {
        toast.success('New URL is registered successfully');
      } else {
        toast.error(message);
      }
    }
    setRegistering(false);
  };
  const [statsShortCode, setStatsShortCode] = useState<string>('');
  const [statsShortCodeError, setStatsShortCodeError] = useState<string>('');
  const [displaying, setDisplaying] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<{
    accessCount: number;
    createdAt: Date;
    updatedAt: Date;
    urlCode: string;
    urlOriginal: string;
    urlShort: string;
  }>();
  const displayStats = async () => {
    setDisplaying(true);
    if (statsShortCode.trim() === '') {
      setStatsShortCodeError('short code is necessary field');
    } else {
      const { success, message, content } = await urlShortster.getShortCodeStats({
        shortcode: statsShortCode.trim()
      });
      if (success) {
        setDisplayData(content);
      } else {
        toast.error(message);
      }
    }
    setDisplaying(false);
  };
  return (
    <div className="container mx-auto flex flex-col">
      <div className="p-8 flex items-center gap-6">
        <label htmlFor="original-url">Original Url</label>
        <input
          id="original-url"
          className={`${
            originalUrlError === '' ? 'ring-0' : 'ring-2 ring-red-600'
          } border px-4 py-2 outline-0 focus:outline-1 focus:outline-blue-600`}
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="http:// or https://"
        />
        <label htmlFor="short-code">Desired Short Code</label>
        <input
          id="short-code"
          className="border px-4 py-2 ring-0 outline-0 focus:outline-1 focus:outline-blue-600"
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="blank or more than 4 letters"
        />
        <button
          className="border px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
          onClick={register}
        >
          {registering ? 'Registering' : 'Register'}
        </button>
      </div>
      <div className="p-8 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <label htmlFor="stats-short-url">Short Code</label>
          <input
            id="stats-short-url"
            className={`${
              statsShortCodeError === '' ? 'ring-0' : 'ring-2 ring-red-600'
            } border px-4 py-2 outline-0 focus:outline-1 focus:outline-blue-600`}
            type="text"
            value={statsShortCode}
            onChange={(e) => setStatsShortCode(e.target.value)}
            placeholder="required"
          />
          <button
            className="border px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
            onClick={displayStats}
          >
            {displaying ? 'Displaying' : 'Display'} Stats
          </button>
        </div>
        <div className="flex items-center gap-6">
          <label className="w-32" htmlFor="stats-short-url">
            Short Code
          </label>
          <input
            className={`${
              statsShortCodeError === '' ? 'ring-0' : 'ring-2 ring-red-600'
            } border px-4 py-2 outline-0 w-full`}
            type="text"
            defaultValue={displayData?.urlCode}
            disabled
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="w-32" htmlFor="stats-short-url">
            Original Code
          </label>
          <input
            className={`${
              statsShortCodeError === '' ? 'ring-0' : 'ring-2 ring-red-600'
            } border px-4 py-2 outline-0 w-full`}
            type="text"
            defaultValue={displayData?.urlOriginal}
            disabled
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="w-32" htmlFor="stats-short-url">
            Stats
          </label>
          <input
            className={`${
              statsShortCodeError === '' ? 'ring-0' : 'ring-2 ring-red-600'
            } border px-4 py-2 outline-0 w-full`}
            type="text"
            defaultValue={displayData?.accessCount}
            disabled
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="w-32" htmlFor="stats-short-url">
            Short Link
          </label>
          <a
            href={displayData?.urlShort}
            target="_blank"
            className={`${
              statsShortCodeError === '' ? 'ring-0' : 'ring-2 ring-red-600'
            } border px-4 py-2 outline-0 w-full`}
          >
            {displayData?.urlShort}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
