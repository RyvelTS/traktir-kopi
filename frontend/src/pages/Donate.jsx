import { useState, useEffect } from "react";
import api from "../lib/api";

export default function Donate() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(15000);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donations");
      if (res.data) setDonations(res.data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  useEffect(() => {
    let active = true;

    api
      .get("/donations")
      .then((res) => {
        if (active && res.data) setDonations(res.data);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/donate", {
        name,
        message,
        amount: parseInt(amount),
      });

      // Open Midtrans Snap Popup
      window.snap.pay(res.data.token, {
        onSuccess: async function (result) {
          alert("Terima kasih banyak atas dukungannya!");
          await api.post("/donate/success", { order_id: result.order_id });

          setName("");
          setMessage("");
          fetchDonations();
        },
        onPending: function () {
          alert("Menunggu pembayaran Anda...");
        },
        onClose: function () {
          alert("Popup pembayaran ditutup.");
        },
      });
    } catch (err) {
      alert("Gagal membuat transaksi. Pastikan backend aktif.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* Rule 2 (Section Reset) + Rule 4 (Edge Safe Zone) */}
      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {/* Rule 1 (Tier 1): page heading block */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              dukungan
            </p>
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Traktir Kopi
            </h1>
            <p className="text-base leading-relaxed md:text-lg">
              Pilih jumlah kopi, tulis pesan semangat, dan bayar instan lewat
              QRIS.
            </p>
          </div>

          {/* Rule 1 (Tier 3): two-column layout grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form card */}
            <div className="flex flex-col gap-6 rounded-2xl bg-surface p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-xl font-bold leading-snug text-primary">
                  Donasi Sekarang
                </h2>
                <p className="text-sm leading-relaxed text-primary/80">
                  Pilih jumlah kopi dan tinggalkan pesan semangat.
                </p>
              </div>

              <form onSubmit={handleDonate} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="donor-name"
                    className="text-sm font-semibold text-primary">
                    Nama Anda
                  </label>
                  <input
                    id="donor-name"
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm leading-relaxed placeholder:text-primary/40"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-primary">
                    Jumlah Dukungan
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15000, 30000, 75000, 150000].map((val) => (
                      <button
                        type="button"
                        key={val}
                        className={`rounded-lg border px-2 py-2.5 text-sm font-semibold ${
                          amount === val
                            ? "border-primary bg-primary text-white"
                            : "border-primary/30 bg-white text-primary hover:border-primary"
                        }`}
                        onClick={() => setAmount(val)}>
                        Rp {(val / 1000).toLocaleString("id-ID")}k
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="donor-message"
                    className="text-sm font-semibold text-primary">
                    Pesan / Doa
                  </label>
                  <textarea
                    id="donor-message"
                    rows="3"
                    placeholder="Tulis pesan penyemangat..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm leading-relaxed placeholder:text-primary/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50">
                  {loading
                    ? "Memproses..."
                    : `Bayar Rp ${parseInt(amount).toLocaleString("id-ID")} via Midtrans`}
                </button>
              </form>
            </div>

            {/* Feed card */}
            <div className="flex flex-col gap-6 rounded-2xl bg-surface p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold leading-snug text-primary">
                Suporter ({donations.length})
              </h2>

              <div className="flex flex-col gap-4">
                {donations.length === 0 ? (
                  <p className="text-sm leading-relaxed text-primary/70">
                    Belum ada suporter. Jadilah yang pertama mentraktir kopi!
                  </p>
                ) : (
                  donations.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 rounded-xl bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-primary">
                          {item.name}
                        </span>
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                          Rp {item.amount.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-primary/80">
                        "{item.message}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
