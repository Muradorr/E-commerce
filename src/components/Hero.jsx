import PropTypes from 'prop-types';
import Icon from './Icon';

function Hero({ title, image }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 sm:px-6">
      <div className="grid overflow-hidden rounded-2xl bg-[#e9e7dd] md:min-h-135 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-7 py-14 sm:px-12">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-600">The everyday collection / 2026</p>
          <h1 className="font-editorial text-6xl leading-[0.98] tracking-tight text-zinc-950 sm:text-7xl">Good things.<br /><span className="italic text-zinc-600">Every day.</span></h1>
          <p className="mt-6 max-w-xs text-sm leading-7 text-zinc-600">Less searching. More finding. Thoughtfully chosen pieces for the way you dress, work, and unwind.</p>
          <a href="#catalog" className="mt-8 inline-flex items-center gap-8 rounded-full bg-zinc-950 px-6 py-4 text-xs font-bold text-white transition hover:bg-zinc-700">{title} the collection <Icon name="arrowRight" className="h-4 w-4" /></a>
          <p className="mt-10 text-[10px] uppercase tracking-[0.16em] text-zinc-500">Apparel &nbsp; / &nbsp; Tech &nbsp; / &nbsp; Lifestyle</p>
        </div>
        <div className="relative min-h-100 overflow-hidden bg-[#b5b5a4] md:min-h-full">
          <img src={image} alt="Casual outfit featuring a striped short-sleeve shirt" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] uppercase tracking-widest text-zinc-950">NEW ITEMS</span>
          <div className="absolute bottom-6 left-6 right-6 text-white"><p className="text-[10px] uppercase tracking-widest">Made for your everyday</p><p className="mt-2 font-editorial text-3xl">A new kind of essential.</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 border-b border-zinc-200 py-5 text-center text-[10px] font-medium uppercase tracking-[0.13em] text-zinc-600 sm:grid-cols-3"><span>Complimentary delivery on every order</span><span>Thoughtfully selected. Made to last.</span><span>Easy returns within 7 days</span></div>
    </section>
  );
}
Hero.propTypes = { title: PropTypes.string.isRequired, image: PropTypes.string.isRequired };
export default Hero;
