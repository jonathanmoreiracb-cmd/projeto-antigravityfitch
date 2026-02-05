import { supabase } from '@/lib/supabaseClient';
import { Banner, Product } from '@/lib/types';
import HeroBanners from '@/components/home/HeroBanners';
import CategoryStrip from '@/components/home/CategoryStrip';
import NewArrivalsStrip from '@/components/home/NewArrivalsStrip';
import BenefitsRow from '@/components/home/BenefitsRow';
import BestSellersGrid from '@/components/home/BestSellersGrid';
import StoreSection from '@/components/home/StoreSection';
import HowToBuy from '@/components/home/HowToBuy';
import FAQ from '@/components/home/FAQ';

export const revalidate = 0;

export default async function Home() {
  // 1. Fetch Banners
  const { data: bannersData } = await supabase
    .from('banners')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true });

  const banners = (bannersData as unknown as Banner[]) || [];

  // 2. Fetch Best Sellers (Highlights first, then name)
  const { data: featuredData } = await supabase
    .from('products')
    .select(`
      *,
      prices!inner(*),
      product_images(*)
    `)
    .eq('ativo', true)
    .order('destaque', { ascending: false })
    .order('nome', { ascending: true })
    .limit(8);

  const featuredProducts = (featuredData as unknown as Product[]) || [];

  return (
    <div className="flex flex-col gap-0 pb-0">
      <HeroBanners banners={banners} />
      <CategoryStrip />
      <NewArrivalsStrip />
      <BenefitsRow />
      <BestSellersGrid products={featuredProducts} />
      <StoreSection />
      <HowToBuy />
      <FAQ />
      {/* Footer is handled by Layout, but if user explicitly wanted it here and nowhere else, we might need adjustments. 
          For now, we assume the layout provides the footer using the new component. 
          However, to strictly follow 'Implementar na Home ... Footer completo', 
          I will ensure the global footer allows this, or I'll add a 'SiteFooter' here if I disable the global one.
          
          Actually, let's stick to Layout for Footer to avoid duplication, 
          but I will update the Footer component to be the new one.
      */}
    </div>
  );
}

