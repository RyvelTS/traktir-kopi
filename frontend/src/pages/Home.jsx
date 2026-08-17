import { Link } from "react-router-dom";

const STACK = [
  {
    title: "Go + Gin API",
    body: "Handler tipis dan ter-typed dengan dependency injection. Empat rute mencakup pembuatan, daftar, webhook, dan konfirmasi.",
  },
  {
    title: "React 19 + Vite",
    body: "Klien berbasis komponen dengan React Router 7 dan Tailwind CSS v4, lengkap dengan HMR instan saat mengembangkan.",
  },
  {
    title: "PostgreSQL + GORM",
    body: "Satu sumber kebenaran untuk data donasi, auto-migrate saat boot — tanpa migrasi manual yang merepotkan.",
  },
  {
    title: "Midtrans Snap + SHA-512",
    body: "Setiap webhook diverifikasi ulang dengan SHA-512 terhadap server key Anda, jadi hanya Midtrans yang bisa menandai donasi sebagai PAID.",
  },
  {
    title: "QRIS dalam satu kode",
    body: "GoPay, OVO, ShopeePay, dan transfer bank menyatu dalam satu kode QR yang dipindai suporter Anda.",
  },
  {
    title: "Docker Compose",
    body: "Postgres, API, dan klien web dikemas sebagai tiga service. Satu perintah menjalankan semuanya.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Rule 2 (Section Reset) + Rule 4 (Edge Safe Zone) */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* Rule 1 (Tier 1): eyebrow + heading + tagline tightly coupled */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              open source · full stack · midtrans
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl">
              Traktir Kopi
            </h1>
            <p className="text-base leading-snug md:text-lg">
              Platform donasi mikro yang benar-benar berfungsi.
            </p>
          </div>

          {/* Rule 3: loose leading for the body paragraph */}
          <p className="max-w-2xl text-base leading-relaxed md:text-lg">
            Traktir Kopi — “traktir saya kopi” — mengubah satu kode QRIS menjadi
            alur donasi lengkap: API Go + Gin, klien React 19 + Vite,
            penyimpanan PostgreSQL, dan pembayaran Midtrans yang diverifikasi di
            sisi server. Tanpa sihir, tanpa vendor lock-in. Fork, isi kunci
            Anda, dan rilis malam ini juga.
          </p>

          {/* Rule 1 (Tier 2): distinct CTA pair */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Traktir Kopi →
            </Link>
            <a
              href="#quickstart"
              className="px-6 py-3 font-semibold text-primary underline-offset-4 hover:underline">
              Lihat quickstart ↓
            </a>
          </div>
        </div>
      </section>

      {/* Rule 2 + Rule 4 — rounded primary block */}
      <section
        id="quickstart"
        className="px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-white md:p-12">
          <div className="flex flex-col gap-6">
            {/* Rule 1 (Tier 1): eyebrow + heading */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                memulai
              </p>
              <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                Jalankan hanya dalam tiga perintah
              </h2>
            </div>

            <p className="text-base leading-relaxed text-white/90">
              Docker Compose menjalankan Postgres, API, dan klien web sekaligus.
              Cukup set tiga variabel lingkungan dan aplikasi langsung hidup.
            </p>

            {/* Terminal block */}
            <pre className="overflow-x-auto rounded-xl bg-white/10 p-6 font-mono text-sm leading-relaxed">
              <code>{`# clone & masuk ke repo
git clone https://github.com/yourname/traktir-kopi.git
cd traktir-kopi

# export kredensial Anda
export DB_PASSWORD=change-me
export MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
export VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx

# build & jalankan seluruh stack
docker compose up --build`}</code>
            </pre>

            <p className="text-sm leading-relaxed text-white/80">
              Buka <span className="font-mono">http://localhost:3000</span> —
              klien menyajikan UI dan meneruskan{" "}
              <span className="font-mono">/api</span> ke backend Go.
            </p>
          </div>
        </div>
      </section>

      {/* Rule 2 + Rule 4 */}
      <section
        id="stack"
        className="px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              tumpukan teknologi
            </p>
            <h2 className="font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
              Komponen matang
            </h2>
          </div>

          {/* Rule 1 (Tier 3): major layout grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STACK.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-2 rounded-2xl bg-surface p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary/80">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rule 2 + Rule 4 — rounded secondary block */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl bg-surface p-8 md:p-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                endpoint api
              </p>
              <h2 className="font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
                Empat endpoint
              </h2>
            </div>

            <pre className="overflow-x-auto rounded-xl bg-primary p-6 font-mono text-sm leading-relaxed text-white">
              <code>{`GET    /api/donations         daftar suporter yang sudah membayar
POST   /api/donate            buat transaksi Snap
POST   /api/webhook           verifikasi tanda tangan & settle
POST   /api/donate/success    konfirmasi manual (fallback)`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Rule 2 + Rule 4 */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              mulai
            </p>
            <h2 className="font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
              Giliran Anda membangun
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed md:text-lg">
            Beri bintang, fork, ubah sesuka hati, dan kirim pull request. Jika
            project ini menghemat waktu Anda dari boilerplate, secangkir kopi
            membuat project ini tetap hidup.
          </p>

          <Link
            to="/donate"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            Traktir Kopi →
          </Link>
        </div>
      </section>
    </div>
  );
}
