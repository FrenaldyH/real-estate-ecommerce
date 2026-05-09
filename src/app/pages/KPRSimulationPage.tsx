import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/auth/LoginModal';
import { RegisterModal } from '../components/auth/RegisterModal';
import { Calculator, Info, ChevronDown, ChevronUp, Building2, Phone, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

// Bank program data
const bankPrograms = [
  // Konvensional Banks
  {
    id: 1,
    type: "konvensional",
    bankName: "BCA",
    programName: "KPR BCA Fixed Rate",
    logo: "/logos/banks/BCA.svg",
    interestType: "Berjenjang",
    startingRate: 3.99,
    phases: [
      { year: "1", rate: 3.99, type: "Fixed" },
      { year: "2-3", rate: 6.99, type: "Fixed" },
      { year: "4-5", rate: 10.49, type: "Fixed" },
      { year: "6+", rate: 13.0, type: "Floating" },
    ],
  },
  {
    id: 2,
    type: "konvensional",
    bankName: "Mandiri",
    programName: "KPR Mandiri Fixed",
    logo: "/logos/banks/Mandiri.svg",
    interestType: "Berjenjang",
    startingRate: 4.25,
    phases: [
      { year: "1-2", rate: 4.25, type: "Fixed" },
      { year: "3-5", rate: 7.5, type: "Fixed" },
      { year: "6+", rate: 12.75, type: "Floating" },
    ],
  },
  {
    id: 3,
    type: "konvensional",
    bankName: "BRI",
    programName: "KPR BRI Griya",
    logo: "/logos/banks/BRI.svg",
    interestType: "Berjenjang",
    startingRate: 3.88,
    phases: [
      { year: "1", rate: 3.88, type: "Fixed" },
      { year: "2", rate: 5.88, type: "Fixed" },
      { year: "3-4", rate: 9.38, type: "Fixed" },
      { year: "5+", rate: 13.25, type: "Floating" },
    ],
  },
  {
    id: 4,
    type: "konvensional",
    bankName: "BTN",
    programName: "KPR Platinum",
    logo: "/logos/banks/BTN.svg",
    interestType: "Berjenjang",
    startingRate: 4.15,
    phases: [
      { year: "1-2", rate: 4.15, type: "Fixed" },
      { year: "3-4", rate: 7.85, type: "Fixed" },
      { year: "5+", rate: 12.5, type: "Floating" },
    ],
  },
  {
    id: 5,
    type: "konvensional",
    bankName: "CIMB Niaga",
    programName: "KPR CIMB Xtra",
    logo: "/logos/banks/CIMB Niaga.svg",
    interestType: "Berjenjang",
    startingRate: 4.5,
    phases: [
      { year: "1", rate: 4.5, type: "Fixed" },
      { year: "2-3", rate: 7.25, type: "Fixed" },
      { year: "4+", rate: 13.0, type: "Floating" },
    ],
  },
  // Syariah Banks
  {
    id: 6,
    type: "syariah",
    bankName: "BCA Syariah",
    programName: "iB KPR Griya",
    logo: "/logos/banks/BCA Syariah.svg",
    interestType: "Fixed",
    startingRate: 2.7,
    phases: [
      { year: "1-3", rate: 2.7, type: "Margin Tetap" },
      { year: "4-25", rate: 13.0, type: "Margin Tetap" },
    ],
  },
  {
    id: 7,
    type: "syariah",
    bankName: "BSI (ex-Mandiri Syariah)",
    programName: "KPR iB Griya Berkah",
    logo: "/logos/banks/BSI.svg",
    interestType: "Fixed",
    startingRate: 2.99,
    phases: [
      { year: "1-2", rate: 2.99, type: "Margin Tetap" },
      { year: "3-25", rate: 12.5, type: "Margin Tetap" },
    ],
  },
  {
    id: 8,
    type: "syariah",
    bankName: "CIMB Niaga Syariah",
    programName: "KPR iB Griya Hasanah",
    logo: "/logos/banks/CIMB Niaga Syariah.svg",
    interestType: "Fixed",
    startingRate: 3.2,
    phases: [
      { year: "1-3", rate: 3.2, type: "Margin Tetap" },
      { year: "4-25", rate: 13.2, type: "Margin Tetap" },
    ],
  },
  {
    id: 9,
    type: "syariah",
    bankName: "BTN Syariah",
    programName: "KPR Sejahtera iB",
    logo: "/logos/banks/BTN Syariah.svg",
    interestType: "Fixed",
    startingRate: 2.85,
    phases: [
      { year: "1-2", rate: 2.85, type: "Margin Tetap" },
      { year: "3-25", rate: 12.75, type: "Margin Tetap" },
    ],
  },
  {
    id: 10,
    type: "syariah",
    bankName: "Muamalat",
    programName: "KPR iB Hunian",
    logo: "/logos/banks/Mualamat.svg",
    interestType: "Fixed",
    startingRate: 3.5,
    phases: [
      { year: "1-3", rate: 3.5, type: "Margin Tetap" },
      { year: "4-25", rate: 13.5, type: "Margin Tetap" },
    ],
  },
];

export function KPRSimulationPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Form State
  const [propertyPrice, setPropertyPrice] = useState(500000000);
  const [downPayment, setDownPayment] = useState(100000000);
  const [tenor, setTenor] = useState(15);
  const [kprType, setKprType] = useState<'konvensional' | 'syariah'>('konvensional');
  const [propertyType, setPropertyType] = useState('rumah');

  // UI State
  const [expandedBankId, setExpandedBankId] = useState<number | null>(null);

  // Calculated values
  const loanAmount = propertyPrice - downPayment;
  const downPaymentPercentage = Math.round((downPayment / propertyPrice) * 100);

  // Filter banks based on KPR type
  const filteredBanks = bankPrograms.filter(bank => bank.type === kprType);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  // Calculate initial monthly installment for a bank program
  const calculateMonthlyInstallment = (program: typeof bankPrograms[0]) => {
    const months = tenor * 12;
    const firstPhaseRate = program.phases[0].rate / 100 / 12;
    
    if (program.type === 'konvensional') {
      // Use first phase fixed rate for initial calculation
      const installment = loanAmount * (firstPhaseRate * Math.pow(1 + firstPhaseRate, months)) / (Math.pow(1 + firstPhaseRate, months) - 1);
      return Math.round(installment);
    } else {
      // Syariah: flat margin calculation for first phase
      const firstPhaseYears = parseInt(program.phases[0].year.split('-')[1] || program.phases[0].year);
      const firstPhaseMonths = firstPhaseYears * 12;
      const totalFirstPhase = loanAmount + (loanAmount * (program.phases[0].rate / 100) * firstPhaseYears);
      return Math.round(totalFirstPhase / firstPhaseMonths);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-blue-400/30">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Simulasi KPR Real-time</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Simulasi & Pilihan KPR Terbaik untuk Anda
            </h1>
            <p className="text-lg text-slate-300 mb-2">
              Bandingkan cicilan, bunga, dan program KPR dari berbagai bank secara real-time
            </p>
            <p className="text-sm text-slate-400 italic">
              *Simulasi menggunakan asumsi bunga floating setelah masa fixed berakhir
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT SIDE - Simulation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Simulasi</h2>

                {/* KPR Type Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Jenis KPR</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setKprType('konvensional')}
                      className={`py-4 px-4 rounded-xl font-semibold transition-all text-left ${
                        kprType === 'konvensional'
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <div className="font-bold text-lg">Konvensional</div>
                      <div className={`text-xs mt-1 ${kprType === 'konvensional' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Bunga berbasis suku bunga bank
                      </div>
                    </button>
                    <button
                      onClick={() => setKprType('syariah')}
                      className={`py-4 px-4 rounded-xl font-semibold transition-all text-left ${
                        kprType === 'syariah'
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <div className="font-bold text-lg">Syariah</div>
                      <div className={`text-xs mt-1 ${kprType === 'syariah' ? 'text-blue-100' : 'text-slate-500'}`}>
                        Tanpa bunga, margin tetap
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mt-3">
                    {kprType === 'konvensional' 
                      ? '✓ Menampilkan program dari bank konvensional' 
                      : '✓ Menampilkan program dari bank syariah'}
                  </p>
                </div>

                {/* Property Price */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Harga Properti
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                    <input
                      type="text"
                      value={formatNumber(propertyPrice)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPropertyPrice(Number(value) || 0);
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Uang Muka / DP <span className="text-blue-600">({downPaymentPercentage}%)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                    <input
                      type="text"
                      value={formatNumber(downPayment)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const dpValue = Number(value) || 0;
                        if (dpValue <= propertyPrice) {
                          setDownPayment(dpValue);
                        }
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Tenor */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Tenor <span className="text-blue-600">({tenor} Tahun)</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={tenor}
                    onChange={(e) => setTenor(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((tenor - 5) / 20) * 100}%, #E2E8F0 ${((tenor - 5) / 20) * 100}%, #E2E8F0 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>5 Tahun</span>
                    <span>25 Tahun</span>
                  </div>
                </div>

                {/* Property Type (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Jenis Properti <span className="text-slate-400 text-xs">(opsional)</span>
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-medium bg-white"
                  >
                    <option value="rumah">Rumah</option>
                    <option value="apartemen">Apartemen</option>
                    <option value="ruko">Ruko</option>
                    <option value="tanah">Tanah</option>
                  </select>
                </div>

                {/* Financial Assumption Block */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-900 mb-2">Asumsi Perhitungan</h3>
                      {kprType === 'konvensional' ? (
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>• Bunga fixed di awal (promo bank)</p>
                          <p>• Dilanjutkan bunga floating ~13% per tahun</p>
                          <p className="text-xs text-blue-600 italic mt-2">
                            Bunga floating dapat berubah mengikuti kondisi pasar dan kebijakan bank
                          </p>
                        </div>
                      ) : (
                        <div className="text-sm text-blue-800 space-y-1">
                          <p>• Margin tetap (fixed) sesuai akad</p>
                          <p>• Tanpa bunga (non-riba)</p>
                          <p className="text-xs text-blue-600 italic mt-2">
                            Menggunakan akad Murabahah atau akad syariah lainnya
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Programs List */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Program KPR Tersedia ({filteredBanks.length} Bank)
                </h2>

                <div className="space-y-4">
                  {filteredBanks.map((bank) => {
                    const monthlyInstallment = calculateMonthlyInstallment(bank);
                    const isExpanded = expandedBankId === bank.id;

                    return (
                      <div
                        key={bank.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-slate-200"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden p-1.5 flex-shrink-0">
                                <img
                                  src={bank.logo}
                                  alt={`Logo ${bank.bankName}`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback = e.currentTarget
                                      .nextElementSibling as HTMLElement;
                                    if (fallback)
                                      fallback.style.display = "flex";
                                  }}
                                />
                                <span className="hidden w-full h-full items-center justify-center text-xs font-bold text-slate-500 bg-slate-100 rounded-lg">
                                  {bank.bankName
                                    .split(" ")[0]
                                    .slice(0, 3)
                                    .toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                  {bank.bankName}
                                </h3>
                                <p className="text-slate-600">
                                  {bank.programName}
                                </p>
                                <div className="mt-2">
                                  <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                      bank.type === "konvensional"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {bank.interestType}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Monthly Installment */}
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 mb-4 border border-blue-100">
                            <p className="text-sm text-slate-600 mb-1">
                              Cicilan Awal per Bulan
                            </p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
                              Mulai dari {formatCurrency(monthlyInstallment)}
                            </p>
                            <p className="text-xs text-slate-600 mt-2">
                              {bank.startingRate}%{" "}
                              {bank.type === "konvensional"
                                ? "fixed"
                                : "margin"}{" "}
                              tahun pertama
                              {bank.type === "konvensional" && (
                                <span className="text-blue-600">
                                  {" "}
                                  + floating ~13%
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 mb-4">
                            <button
                              onClick={() =>
                                setExpandedBankId(isExpanded ? null : bank.id)
                              }
                              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  Tutup Detail
                                </>
                              ) : (
                                <>
                                  <Info className="w-4 h-4" />
                                  Lihat Detail Simulasi
                                </>
                              )}
                            </button>
                            <a
                              href={`https://wa.me/6285385560367?text=${encodeURIComponent(`Halo RumahKu, saya ingin konsultasi KPR untuk program ${bank.name}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4" />
                              Ajukan / Konsultasi
                            </a>
                          </div>

                          {/* Expanded Detail */}
                          {isExpanded && (
                            <div className="border-t border-slate-200 pt-4 mt-4">
                              <h4 className="font-bold text-slate-900 mb-4">
                                Rincian Simulasi {tenor} Tahun
                              </h4>
                              <div className="space-y-3">
                                {bank.phases.map((phase, index) => {
                                  const phaseMonthlyPayment =
                                    calculateMonthlyInstallment(bank);

                                  return (
                                    <div
                                      key={index}
                                      className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <div>
                                          <p className="font-semibold text-slate-900">
                                            Tahun {phase.year}
                                          </p>
                                          <p className="text-sm text-slate-600">
                                            {phase.type}: {phase.rate}%
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-lg font-bold text-blue-600">
                                            ~
                                            {formatCurrency(
                                              phaseMonthlyPayment,
                                            )}
                                          </p>
                                          <p className="text-xs text-slate-500">
                                            per bulan
                                          </p>
                                        </div>
                                      </div>
                                      {phase.type === "Floating" && (
                                        <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
                                          ⚠️ Floating rate mengikuti kondisi
                                          pasar dan kebijakan bank
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {bank.type === "syariah" && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-green-800">
                                    ✓ Tidak menggunakan bunga, menggunakan
                                    margin tetap sesuai akad
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Sticky Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Detail Simulasi</h3>
                
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Total Pinjaman</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(loanAmount)}</p>
                  </div>

                  <div className="pb-4 border-b border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Uang Muka (DP)</p>
                    <p className="text-xl font-bold text-slate-900">{formatCurrency(downPayment)}</p>
                    <p className="text-xs text-slate-500 mt-1">{downPaymentPercentage}% dari harga properti</p>
                  </div>

                  <div className="pb-4 border-b border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Tenor</p>
                    <p className="text-xl font-bold text-slate-900">{tenor} Tahun</p>
                    <p className="text-xs text-slate-500 mt-1">{tenor * 12} bulan</p>
                  </div>

                  <div className="pb-4 border-b border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Jenis KPR</p>
                    <p className="text-xl font-bold text-slate-900 capitalize">{kprType}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Estimasi Cicilan Awal</p>
                        <p className="text-sm text-blue-900 font-semibold">
                          Lihat program bank di bawah untuk detail cicilan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Tentang KPR */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang KPR</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                KPR adalah fasilitas pembiayaan dari bank atau lembaga keuangan untuk membeli properti (rumah/apartemen) dengan sistem cicilan.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Nasabah membayar uang muka (Down Payment), sementara sisa harga properti dibiayai bank dan dicicil bulanan sesuai tenor yang telah ditentukan.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-slate-700">KPR Konvensional</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-slate-700">KPR Syariah</p>
                </div>
              </div>
            </div>

            {/* Data yang Dibutuhkan */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Data yang Dibutuhkan</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-2">1. Data Diri</h4>
                  <ul className="text-sm text-slate-600 space-y-1 ml-4">
                    <li>• KTP</li>
                    <li>• Kartu Keluarga</li>
                    <li>• NPWP</li>
                    <li>• Akta Nikah/Cerai (jika ada)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-2">2. Dokumen Penghasilan</h4>
                  <ul className="text-sm text-slate-600 space-y-1 ml-4">
                    <li>• Slip gaji / laporan usaha</li>
                    <li>• Rekening koran 3 bulan</li>
                    <li>• Surat keterangan kerja / izin usaha</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  ⚠️ Dokumen harus valid dan terbaru untuk mempercepat proses approval
                </p>
              </div>
            </div>

            {/* Cara Pengajuan */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Cara Pengajuan KPR</h3>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-slate-700">Isi simulasi dan pilih program</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-slate-700">Klik ajukan / konsultasi</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm text-slate-700">Tim akan menghubungi via WhatsApp / telepon</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-sm text-slate-700">Upload dokumen</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    5
                  </div>
                  <p className="text-sm text-slate-700">Proses analisis bank</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm text-slate-700 font-semibold">Approval & akad kredit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Disclaimer */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Disclaimer Penting</h3>
                <div className="text-sm text-amber-800 space-y-2">
                  <p>
                    • Simulasi ini menggunakan asumsi standar dan dapat berbeda dengan perhitungan final bank
                  </p>
                  <p>
                    • Bunga floating dapat berubah sewaktu-waktu mengikuti kondisi pasar dan kebijakan bank
                  </p>
                  <p>
                    • Persetujuan KPR tergantung pada kelengkapan dokumen dan profil kredit calon debitur
                  </p>
                  <p>
                    • Untuk informasi lebih akurat, silakan konsultasi langsung dengan tim KPR kami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
          border: none;
        }
      `}</style>
    </div>
  );
}