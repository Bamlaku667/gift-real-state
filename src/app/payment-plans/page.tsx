import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Payment Plans & Financing', description: 'Flexible payment plans and bank loan partnerships for Gift Real Estate properties.' };

const paymentPlans = [
    { title: '10% Down Payment', desc: 'Pay 20% upfront, balance spread over the construction period', monthly: 'Birr 200000/month', suitable: '5% discount' },
    { title: '30% Down Payment', desc: '30% down with installments over 5 years post-handover', monthly: 'Birr 150000/month', suitable: '7% discount' },
    { title: '50% Down Payment', desc: 'Half upfront with balance at handover — significant discount', monthly: 'Birr 120000/month', suitable: '10 % discount' },
    { title: 'Cash Purchase', desc: 'Full payment upfront — maximum discount and priority unit selection', monthly: 'Best price guaranteed', suitable: '15% discount' },
];

export default function PaymentPlansPage() {
    return (
        <div className="min-h-screen">
            <section className="relative h-64 flex items-end pb-12 bg-brand-dark overflow-hidden">
                <Image src="/images/atlas 2.jpg" alt="Payment Plans" fill className="object-cover opacity-40" />
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">Make it Yours</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mt-2">Payment Plans</h1>
                </div>
            </section>
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="section-heading mb-4">Flexible Financing Options</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Choose a plan that fits your budget — in Birr, USD, AED, or any foreign currency.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                        {paymentPlans.map((plan) => (
                            <div key={plan.title} className="card-luxury p-8 hover:border-primary/40 transition-colors duration-300">
                                <h3 className="font-heading font-bold text-xl mb-3 gradient-text">{plan.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
                                <div className="flex items-center justify-between py-3 border-t border-border mt-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Monthly Estimate</div>
                                        <div className="font-bold text-lg">{plan.monthly}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">Suitable For</div>
                                        <div className="text-sm font-medium text-primary">{plan.suitable}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Bank Partnerships */}
                    <div className="max-w-4xl mx-auto card-luxury p-8 mb-8">
                        <h3 className="font-heading font-bold text-2xl mb-6 text-center">Bank Loan Partnerships</h3>
                        <p className="text-muted-foreground text-center mb-6">We partner with leading Ethiopian banks to offer competitive mortgage rates.</p>
                        <h3 className="font-heading font-bold text-2xl mb-6 text-center">55/45 % Bank Offer</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {['CBE', 'Awash Bank', 'Abyssinia Bank', 'Zemen Bank'].map((bank) => (
                                <div key={bank} className="p-4 bg-accent rounded-xl font-semibold text-sm">{bank}</div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">GET A PAYMENT PLAN</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
