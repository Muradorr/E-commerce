import { useState } from 'react';
import { isValidEmail } from '../utils/validators';

function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setMessage('Please enter your email address.');
      setIsSuccess(false);
      return;
    }

    if (isValidEmail(email) === false) {
      setMessage('Please enter a valid email address.');
      setIsSuccess(false);
      return;
    }

    setMessage('You are on the list. Discover what is next at Ridleys.');
    setIsSuccess(true);
    setEmail('');
  };

  const renderMessage = () => {
    if (message === '') {
      return null;
    }
    return (
      <p
        role="status"
        className={'mt-3 text-sm font-semibold ' + (isSuccess === true ? 'text-zinc-700' : 'text-red-700')}
      >
        {message}
      </p>
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl bg-[#dce3d8] px-7 py-12 text-zinc-950 sm:px-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <h2 className="font-editorial text-4xl leading-tight tracking-tight md:text-6xl">
            A little less.
            <br />
            A little better.
          </h2>
          <form onSubmit={handleSubmit} noValidate className="mt-8 flex max-w-sm items-center rounded-full bg-white p-1.5">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-zinc-950 outline-hidden placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-white transition hover:bg-zinc-700 active:scale-95"
            >
              Subscribe
            </button>
          </form>
          {renderMessage()}
        </div>

        <div>
          <p className="text-sm font-bold">Everyday, thoughtfully chosen.</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
            Thoughtful pieces for your wardrobe, workspace, and everyday life. Get occasional updates on new arrivals and useful essentials.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBanner;
