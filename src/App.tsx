import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

const ZapIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AlertTriangleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const TrendingUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BuildingIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const HistoryIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FileSpreadsheetIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TODAY = '2026-07-28';

// Converte uma linha da tabela "empreiteiras" (snake_case) para o formato usado no dashboard (camelCase)
const mapContractFromDB = (row) => ({
  id: row.id,
  nome: row.nome,
  regional: row.regional,
  previstoLV: row.previsto_lv,
  previstoLML: row.previsto_lml,
  previstoLMP: row.previsto_lmp
});

// Converte uma linha da tabela "lancamentos_diarios" (snake_case) para o formato usado no dashboard (camelCase)
const mapLogFromDB = (row) => ({
  id: row.id,
  empreiteiraId: row.empreiteira_id,
  data: row.data,
  mobilizadoLV: row.mobilizado_lv,
  mobilizadoLML: row.mobilizado_lml,
  mobilizadoLMP: row.mobilizado_lmp,
  justificativa: row.justificativa || '',
  previsaoData: row.previsao_data || '',
  semPrevisaoData: !!row.sem_previsao_data,
  previsaoLV: row.previsao_lv || 0,
  previsaoLML: row.previsao_lml || 0,
  previsaoLMP: row.previsao_lmp || 0
});

// Formata 'YYYY-MM-DD' como 'DD/MM'
const toShortDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}` : dateStr;
};

// Monta o resumo por categoria da previsão de reforço, ex: "+2 LV +1 LML"
const formatPrevisaoBreakdown = (item) => {
  const parts = [];
  if (item.previsaoLV > 0) parts.push(`+${item.previsaoLV} LV`);
  if (item.previsaoLML > 0) parts.push(`+${item.previsaoLML} LML`);
  if (item.previsaoLMP > 0) parts.push(`+${item.previsaoLMP} LMP`);
  return parts.join(' ');
};

export default function App() {
  const [contracts, setContracts] = useState([]);
  const [dailyLogs, setDailyLogs] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState('');

  const fetchContracts = async () => {
    const { data, error } = await supabase
      .from('empreiteiras')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      console.error('Erro ao buscar empreiteiras:', error);
      setLoadError('Não foi possível carregar as empreiteiras. Verifique sua conexão.');
      return;
    }
    setContracts(data.map(mapContractFromDB));
  };

  const fetchDailyLogs = async () => {
    const { data, error } = await supabase
      .from('lancamentos_diarios')
      .select('*');

    if (error) {
      console.error('Erro ao buscar lançamentos diários:', error);
      setLoadError('Não foi possível carregar os lançamentos. Verifique sua conexão.');
      return;
    }
    setDailyLogs(data.map(mapLogFromDB));
  };

  // Busca inicial + assinatura em tempo real: qualquer pessoa que alterar os dados
  // atualiza automaticamente a tela de todo mundo que estiver com o dashboard aberto.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      setIsLoadingData(true);
      await Promise.all([fetchContracts(), fetchDailyLogs()]);
      if (isMounted) setIsLoadingData(false);
    })();

    const channel = supabase
      .channel('dashboard-mobilizacao-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'empreiteiras' }, () => {
        fetchContracts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lancamentos_diarios' }, () => {
        fetchDailyLogs();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [selectedRegional, setSelectedRegional] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [selectedContractForLog, setSelectedContractForLog] = useState(null);

  const [historyContractId, setHistoryContractId] = useState(null);
  const [historyDateStart, setHistoryDateStart] = useState('');
  const [historyDateEnd, setHistoryDateEnd] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('Todos');

  const [contractForm, setContractForm] = useState({
    nome: '',
    regional: 'Regional Norte',
    previstoLV: 0,
    previstoLML: 0,
    previstoLMP: 0
  });

  const [dailyForm, setDailyForm] = useState({
    data: TODAY,
    mobilizadoLV: 0,
    mobilizadoLML: 0,
    mobilizadoLMP: 0,
    justificativa: '',
    previsaoData: '',
    semPrevisaoData: false,
    previsaoLV: 0,
    previsaoLML: 0,
    previsaoLMP: 0
  });

  // Cálculos auxiliares para saber, em tempo real dentro do modal, se o lançamento
  // que está sendo digitado configura déficit (usados para exibir os campos de previsão)
  const modalMobTotal = (Number(dailyForm.mobilizadoLV) || 0) + (Number(dailyForm.mobilizadoLML) || 0) + (Number(dailyForm.mobilizadoLMP) || 0);
  const modalPrevTotal = selectedContractForLog ? selectedContractForLog.totalPrevisto : 0;
  const isModalDeficit = !!selectedContractForLog && modalMobTotal < modalPrevTotal;
  const deficitAmount = modalPrevTotal - modalMobTotal;

  const regionais = useMemo(() => {
    const list = Array.from(new Set(contracts.map(c => c.regional)));
    return ['Todas', ...list.sort()];
  }, [contracts]);

  const dailyDataForSelectedDate = useMemo(() => {
    return contracts.map(contract => {
      const log = dailyLogs.find(
        l => l.empreiteiraId === contract.id && l.data === selectedDate
      );

      const previstoLV = contract.previstoLV || 0;
      const previstoLML = contract.previstoLML || 0;
      const previstoLMP = contract.previstoLMP || 0;
      const totalPrevisto = previstoLV + previstoLML + previstoLMP;

      const mobilizadoLV = log ? log.mobilizadoLV : 0;
      const mobilizadoLML = log ? log.mobilizadoLML : 0;
      const mobilizadoLMP = log ? log.mobilizadoLMP : 0;
      const totalMobilizado = log ? (mobilizadoLV + mobilizadoLML + mobilizadoLMP) : 0;

      const deltaLV = log ? mobilizadoLV - previstoLV : -previstoLV;
      const deltaLML = log ? mobilizadoLML - previstoLML : -previstoLML;
      const deltaLMP = log ? mobilizadoLMP - previstoLMP : -previstoLMP;

      const saldoTotal = totalMobilizado - totalPrevisto;
      const hasLog = !!log;

      let status = 'OK';
      if (!hasLog) status = 'Sem Registro';
      else if (saldoTotal < 0) status = 'Deficit';
      else if (saldoTotal > 0) status = 'Extra';

      const percentage = totalPrevisto > 0 ? Math.round((totalMobilizado / totalPrevisto) * 100) : 0;

      return {
        ...contract,
        totalPrevisto,
        mobilizadoLV,
        mobilizadoLML,
        mobilizadoLMP,
        totalMobilizado,
        deltaLV,
        deltaLML,
        deltaLMP,
        saldoTotal,
        hasLog,
        status,
        percentage,
        justificativa: log?.justificativa || '',
        logId: log?.id
      };
    });
  }, [contracts, dailyLogs, selectedDate]);

  const filteredDailyData = useMemo(() => {
    return dailyDataForSelectedDate.filter(item => {
      if (selectedRegional !== 'Todas' && item.regional !== selectedRegional) {
        return false;
      }

      if (statusFilter === 'Atualizados' && !item.hasLog) return false;
      if (statusFilter === 'Pendentes' && item.hasLog) return false;
      if (statusFilter === 'Deficit' && (item.saldoTotal >= 0 || !item.hasLog)) return false;
      if (statusFilter === 'Extra' && item.saldoTotal <= 0) return false;
      if (statusFilter === 'OK' && (item.saldoTotal !== 0 || !item.hasLog)) return false;

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = item.nome.toLowerCase().includes(term);
        const matchReg = item.regional.toLowerCase().includes(term);
        const matchJust = item.justificativa.toLowerCase().includes(term);
        if (!matchName && !matchReg && !matchJust) return false;
      }

      return true;
    });
  }, [dailyDataForSelectedDate, selectedRegional, statusFilter, searchTerm]);

  const summary = useMemo(() => {
    let totalPrev = 0;
    let totalMob = 0;
    let totalDeficit = 0;
    let totalExtra = 0;
    let countDeficit = 0;
    let countExtra = 0;
    let countOK = 0;
    let countAtualizados = 0;
    let countPendentes = 0;

    dailyDataForSelectedDate.forEach(item => {
      totalPrev += item.totalPrevisto;
      if (item.hasLog) {
        countAtualizados += 1;
        totalMob += item.totalMobilizado;
        if (item.saldoTotal < 0) {
          totalDeficit += Math.abs(item.saldoTotal);
          countDeficit += 1;
        } else if (item.saldoTotal > 0) {
          totalExtra += item.saldoTotal;
          countExtra += 1;
        } else {
          countOK += 1;
        }
      } else {
        countPendentes += 1;
      }
    });

    const taxaGeral = totalPrev > 0 ? Math.round((totalMob / totalPrev) * 100) : 0;
    const taxaAtualizacao = dailyDataForSelectedDate.length > 0
      ? Math.round((countAtualizados / dailyDataForSelectedDate.length) * 100)
      : 0;

    return {
      totalPrev,
      totalMob,
      totalDeficit,
      totalExtra,
      countDeficit,
      countExtra,
      countOK,
      countAtualizados,
      countPendentes,
      taxaGeral,
      taxaAtualizacao
    };
  }, [dailyDataForSelectedDate]);

  const getPastDatesRange = (baseDateStr, daysCount) => {
    const dates = [];
    const base = new Date(baseDateStr + 'T00:00:00');
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleExportCSV = () => {
    const headers = [
      'Data Consulta',
      'Empreiteira',
      'Regional',
      'Status Lancamento',
      'Previsto LV',
      'Mobilizado LV',
      'Previsto LML',
      'Mobilizado LML',
      'Previsto LMP',
      'Mobilizado LMP',
      'Total Previsto',
      'Total Mobilizado',
      'Saldo Total',
      'Status Balanco',
      'Justificativa'
    ];

    const rows = filteredDailyData.map(d => [
      selectedDate,
      `"${d.nome}"`,
      `"${d.regional}"`,
      `"${d.hasLog ? 'Atualizado' : 'Pendente'}"`,
      d.previstoLV,
      d.mobilizadoLV,
      d.previstoLML,
      d.mobilizadoLML,
      d.previstoLMP,
      d.mobilizadoLMP,
      d.totalPrevisto,
      d.totalMobilizado,
      d.saldoTotal,
      `"${d.status}"`,
      `"${d.justificativa.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_mobilizacao_dia_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPeriodReport = (daysCount) => {
    const dateRange = getPastDatesRange(selectedDate, daysCount);

    const headers = [
      'Data',
      'Empreiteira',
      'Regional',
      'Status Lancamento',
      'Previsto LV',
      'Mobilizado LV',
      'Previsto LML',
      'Mobilizado LML',
      'Previsto LMP',
      'Mobilizado LMP',
      'Total Previsto',
      'Total Mobilizado',
      'Saldo Total',
      'Situacao Mobilizacao',
      'Justificativa'
    ];

    const rows = [];

    dateRange.forEach(dateStr => {
      contracts.forEach(contract => {
        if (selectedRegional !== 'Todas' && contract.regional !== selectedRegional) {
          return;
        }

        const log = dailyLogs.find(
          l => l.empreiteiraId === contract.id && l.data === dateStr
        );

        const isUpdated = !!log;
        const previstoLV = contract.previstoLV || 0;
        const previstoLML = contract.previstoLML || 0;
        const previstoLMP = contract.previstoLMP || 0;
        const totalPrevisto = previstoLV + previstoLML + previstoLMP;

        const mobilizadoLV = log ? log.mobilizadoLV : 0;
        const mobilizadoLML = log ? log.mobilizadoLML : 0;
        const mobilizadoLMP = log ? log.mobilizadoLMP : 0;
        const totalMobilizado = log ? (mobilizadoLV + mobilizadoLML + mobilizadoLMP) : 0;

        const saldoTotal = log ? (totalMobilizado - totalPrevisto) : -totalPrevisto;

        let situacao = 'Pendente de Lancamento';
        if (log) {
          if (saldoTotal < 0) situacao = 'Deficit';
          else if (saldoTotal > 0) situacao = 'Extra';
          else situacao = 'Conforme';
        }

        rows.push([
          dateStr,
          `"${contract.nome}"`,
          `"${contract.regional}"`,
          `"${isUpdated ? 'Atualizado' : 'Pendente'}"`,
          previstoLV,
          mobilizadoLV,
          previstoLML,
          mobilizadoLML,
          previstoLMP,
          mobilizadoLMP,
          totalPrevisto,
          totalMobilizado,
          saldoTotal,
          `"${situacao}"`,
          `"${(log?.justificativa || '').replace(/"/g, '""')}"`
        ]);
      });
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_mobilizacao_${daysCount}dias_ate_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportWeeklyDeficitCSV = () => {
    const headers = [
      'Empreiteira',
      'Regional',
      'Deficit Total',
      'Deficit LV',
      'Deficit LML',
      'Deficit LMP',
      'Previsao Data',
      'Previsao LV',
      'Previsao LML',
      'Previsao LMP',
      'Comentario',
      'Datas Analisadas'
    ];

    const rows = weeklyDeficitLogs.map(item => [
      `"${item.nome}"`,
      `"${item.regional}"`,
      item.saldoTotal,
      item.deltaLV,
      item.deltaLML,
      item.deltaLMP,
      `"${item.semPrevisaoData ? 'Sem previsao ate o momento' : (item.previsaoData || '')}"`,
      item.previsaoLV,
      item.previsaoLML,
      item.previsaoLMP,
      `"${item.justificativa.replace(/"/g, '""')}"`,
      `"${item.datas.join(' | ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF'
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `deficit_semanal_ate_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenContractModal = (contract = null) => {
    if (contract) {
      setEditingContract(contract);
      setContractForm({
        nome: contract.nome,
        regional: contract.regional,
        previstoLV: contract.previstoLV,
        previstoLML: contract.previstoLML,
        previstoLMP: contract.previstoLMP
      });
    } else {
      setEditingContract(null);
      setContractForm({
        nome: '',
        regional: regionais[1] || 'Regional Norte',
        previstoLV: 0,
        previstoLML: 0,
        previstoLMP: 0
      });
    }
    setIsContractModalOpen(true);
  };

  const handleSaveContract = async (e) => {
    e.preventDefault();
    if (!contractForm.nome.trim()) return;

    const payload = {
      nome: contractForm.nome.trim(),
      regional: contractForm.regional,
      previsto_lv: Number(contractForm.previstoLV) || 0,
      previsto_lml: Number(contractForm.previstoLML) || 0,
      previsto_lmp: Number(contractForm.previstoLMP) || 0
    };

    if (editingContract) {
      const { error } = await supabase
        .from('empreiteiras')
        .update(payload)
        .eq('id', editingContract.id);

      if (error) {
        console.error('Erro ao atualizar empreiteira:', error);
        alert('Não foi possível salvar as alterações. Tente novamente.');
        return;
      }
    } else {
      const { error } = await supabase
        .from('empreiteiras')
        .insert(payload);

      if (error) {
        console.error('Erro ao criar empreiteira:', error);
        alert('Não foi possível cadastrar a empreiteira. Tente novamente.');
        return;
      }
    }

    await fetchContracts();
    setIsContractModalOpen(false);
  };

  const handleDeleteContract = async (id) => {
    const { error } = await supabase
      .from('empreiteiras')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir empreiteira:', error);
      alert('Não foi possível excluir a empreiteira. Tente novamente.');
      return;
    }

    // A tabela de lançamentos tem "on delete cascade", então os lançamentos
    // dessa empreiteira já são removidos automaticamente no banco.
    await fetchContracts();
    await fetchDailyLogs();
  };

  const handleOpenDailyModal = (item) => {
    setSelectedContractForLog(item);

    // Lançamento já existente exatamente na data selecionada (edição)
    const existingLog = item.hasLog
      ? dailyLogs.find(l => l.empreiteiraId === item.id && l.data === selectedDate)
      : null;

    // Lançamento mais recente da empreiteira antes da data selecionada
    // (usado para pré-preencher quando ainda não existe lançamento na data escolhida)
    const previousLogs = dailyLogs
      .filter(l => l.empreiteiraId === item.id && l.data < selectedDate)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
    const lastLog = previousLogs[0] || null;

    // Fonte de preenchimento: o próprio lançamento da data (se existir),
    // senão o último lançamento anterior (se existir),
    // senão vazio/previsto em contrato (primeiro lançamento da empreiteira)
    const sourceLog = existingLog || lastLog;

    setDailyForm({
      data: selectedDate,
      mobilizadoLV: sourceLog ? sourceLog.mobilizadoLV : item.previstoLV,
      mobilizadoLML: sourceLog ? sourceLog.mobilizadoLML : item.previstoLML,
      mobilizadoLMP: sourceLog ? sourceLog.mobilizadoLMP : item.previstoLMP,
      justificativa: sourceLog?.justificativa || '',
      previsaoData: sourceLog?.previsaoData || '',
      semPrevisaoData: sourceLog?.semPrevisaoData || false,
      previsaoLV: sourceLog?.previsaoLV || 0,
      previsaoLML: sourceLog?.previsaoLML || 0,
      previsaoLMP: sourceLog?.previsaoLMP || 0
    });
    setIsDailyModalOpen(true);
  };

  const handleSaveDailyLog = async (e) => {
    e.preventDefault();
    if (!selectedContractForLog) return;

    const mobLV = Number(dailyForm.mobilizadoLV) || 0;
    const mobLML = Number(dailyForm.mobilizadoLML) || 0;
    const mobLMP = Number(dailyForm.mobilizadoLMP) || 0;
    const totalMob = mobLV + mobLML + mobLMP;
    const totalPrev = selectedContractForLog.totalPrevisto;

    // 1. Identifica se existe déficit
    const isDeficit = totalMob < totalPrev;

    // 2. Trava o envio caso a data (ou a flag "sem previsão") ou a justificativa
    // estejam vazias em cenário de déficit
    if (isDeficit) {
      if (!dailyForm.semPrevisaoData && !dailyForm.previsaoData) {
        alert('Como houve déficit, informe a data de previsão de mobilização ou marque "Sem previsão até o momento".');
        return;
      }
      if (!dailyForm.justificativa.trim()) {
        alert('Como houve déficit, o comentário/justificativa é obrigatório.');
        return;
      }
    }

    // 3. Monta o payload (colunas em snake_case) formatando os dados de acordo com o estado do déficit
    const payload = {
      empreiteira_id: selectedContractForLog.id,
      data: dailyForm.data,
      mobilizado_lv: mobLV,
      mobilizado_lml: mobLML,
      mobilizado_lmp: mobLMP,
      justificativa: dailyForm.justificativa.trim(),
      sem_previsao_data: isDeficit ? dailyForm.semPrevisaoData : false,
      previsao_data: (isDeficit && !dailyForm.semPrevisaoData && dailyForm.previsaoData) ? dailyForm.previsaoData : null,
      previsao_lv: isDeficit ? (Number(dailyForm.previsaoLV) || 0) : 0,
      previsao_lml: isDeficit ? (Number(dailyForm.previsaoLML) || 0) : 0,
      previsao_lmp: isDeficit ? (Number(dailyForm.previsaoLMP) || 0) : 0
    };

    // upsert: se já existir lançamento para essa empreiteira nessa data, atualiza;
    // senão, cria um novo (usa a constraint UNIQUE (empreiteira_id, data) criada no banco)
    const { error } = await supabase
      .from('lancamentos_diarios')
      .upsert(payload, { onConflict: 'empreiteira_id,data' });

    if (error) {
      console.error('Erro ao registrar mobilização:', error);
      alert('Não foi possível registrar a mobilização. Tente novamente.');
      return;
    }

    await fetchDailyLogs();
    setIsDailyModalOpen(false);
  };

  const activeHistoryContract = useMemo(() => {
    if (!historyContractId) return null;
    return contracts.find(c => c.id === historyContractId) || null;
  }, [historyContractId, contracts]);

  const historyLogsForContract = useMemo(() => {
    if (!historyContractId) return [];
    return dailyLogs
      .filter(l => l.empreiteiraId === historyContractId)
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [historyContractId, dailyLogs]);

  const filteredHistoryLogs = useMemo(() => {
    if (!activeHistoryContract) return [];
    const prevTot = activeHistoryContract.previstoLV + activeHistoryContract.previstoLML + activeHistoryContract.previstoLMP;

    return historyLogsForContract.filter(log => {
      if (historyDateStart && log.data < historyDateStart) return false;
      if (historyDateEnd && log.data > historyDateEnd) return false;

      if (historyStatusFilter !== 'Todos') {
        const mobTot = (log.mobilizadoLV || 0) + (log.mobilizadoLML || 0) + (log.mobilizadoLMP || 0);
        const diff = mobTot - prevTot;
        if (historyStatusFilter === 'Deficit' && diff >= 0) return false;
        if (historyStatusFilter === 'Extra' && diff <= 0) return false;
        if (historyStatusFilter === 'Conforme' && diff !== 0) return false;
      }

      return true;
    });
  }, [historyLogsForContract, activeHistoryContract, historyDateStart, historyDateEnd, historyStatusFilter]);

  const trendData7Days = useMemo(() => {
    const dates = getPastDatesRange(selectedDate, 7);
    return dates.map(dateStr => {
      let prevSum = 0;
      let mobSum = 0;
      contracts.forEach(contract => {
        if (selectedRegional !== 'Todas' && contract.regional !== selectedRegional) return;
        const totPrev = (contract.previstoLV || 0) + (contract.previstoLML || 0) + (contract.previstoLMP || 0);
        prevSum += totPrev;
        const log = dailyLogs.find(l => l.empreiteiraId === contract.id && l.data === dateStr);
        if (log) {
          mobSum += (log.mobilizadoLV || 0) + (log.mobilizadoLML || 0) + (log.mobilizadoLMP || 0);
        }
      });
      const parts = dateStr.split('-');
      const shortDate = parts.length === 3 ? `${parts[2]}/${parts[1]}` : dateStr;
      return {
        data: shortDate,
        fullDate: dateStr,
        Previsto: prevSum,
        Mobilizado: mobSum
      };
    });
  }, [contracts, dailyLogs, selectedDate, selectedRegional]);

  const weeklyDeficitLogs = useMemo(() => {
    const dates = getPastDatesRange(selectedDate, 7);
    const list = [];

    dates.forEach(dateStr => {
      contracts.forEach(contract => {
        if (selectedRegional !== 'Todas' && contract.regional !== selectedRegional) return;

        const log = dailyLogs.find(l => l.empreiteiraId === contract.id && l.data === dateStr);
        if (!log) return;

        const prevLV = contract.previstoLV || 0;
        const prevLML = contract.previstoLML || 0;
        const prevLMP = contract.previstoLMP || 0;
        const totalPrevisto = prevLV + prevLML + prevLMP;

        const mobLV = log.mobilizadoLV || 0;
        const mobLML = log.mobilizadoLML || 0;
        const mobLMP = log.mobilizadoLMP || 0;
        const totalMob = mobLV + mobLML + mobLMP;

        const saldo = totalMob - totalPrevisto;

        // Filtra e estrutura apenas os registros onde houve déficit (saldo < 0)
        if (saldo < 0) {
          list.push({
            id: `${log.id}-${dateStr}`,
            dataRegistro: dateStr,
            nome: contract.nome,
            regional: contract.regional,
            saldoTotal: saldo,
            deltaLV: mobLV - prevLV,
            deltaLML: mobLML - prevLML,
            deltaLMP: mobLMP - prevLMP,
            previsaoData: log.previsaoData,
            semPrevisaoData: log.semPrevisaoData,
            previsaoLV: log.previsaoLV || 0,
            previsaoLML: log.previsaoLML || 0,
            previsaoLMP: log.previsaoLMP || 0,
            previsaoTotal: (log.previsaoLV || 0) + (log.previsaoLML || 0) + (log.previsaoLMP || 0),
            justificativa: log.justificativa || ''
          });
        }
      });
    });

    // Agrupa lançamentos idênticos (mesma empreiteira, mesmo déficit por categoria,
    // mesma previsão e mesmo comentário) em uma única linha, guardando todas as datas
    const groupsMap = new Map();

    list.forEach(item => {
      const signature = [
        item.nome,
        item.deltaLV,
        item.deltaLML,
        item.deltaLMP,
        item.semPrevisaoData ? 'sem-previsao' : (item.previsaoData || ''),
        item.previsaoLV,
        item.previsaoLML,
        item.previsaoLMP,
        item.justificativa.trim()
      ].join('|');

      const key = `${item.nome}__${signature}`;

      if (!groupsMap.has(key)) {
        groupsMap.set(key, { ...item, datas: [item.dataRegistro] });
      } else {
        const existing = groupsMap.get(key);
        existing.datas.push(item.dataRegistro);
        // mantém sempre a data mais recente como referência principal da linha
        if (new Date(item.dataRegistro) > new Date(existing.dataRegistro)) {
          existing.dataRegistro = item.dataRegistro;
        }
      }
    });

    const groupedList = Array.from(groupsMap.values()).map(g => ({
      ...g,
      datas: g.datas.sort((a, b) => new Date(a) - new Date(b))
    }));

    return groupedList.sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro));
  }, [contracts, dailyLogs, selectedDate, selectedRegional]);

  const pieChartData = useMemo(() => {
    return [
      { name: 'Conforme', value: summary.countOK, color: '#10b981' },
      { name: 'Déficit', value: summary.countDeficit, color: '#f43f5e' },
      { name: 'Extra', value: summary.countExtra, color: '#0284c7' },
      { name: 'Pendente', value: summary.countPendentes, color: '#f59e0b' }
    ].filter(item => item.value > 0);
  }, [summary]);

  const categoryBreakdownData = useMemo(() => {
    let lvPrev = 0, lvMob = 0;
    let lmlPrev = 0, lmlMob = 0;
    let lmpPrev = 0, lmpMob = 0;

    filteredDailyData.forEach(c => {
      lvPrev += c.previstoLV;
      lvMob += c.hasLog ? c.mobilizadoLV : 0;
      lmlPrev += c.previstoLML;
      lmlMob += c.hasLog ? c.mobilizadoLML : 0;
      lmpPrev += c.previstoLMP;
      lmpMob += c.hasLog ? c.mobilizadoLMP : 0;
    });

    return [
      { categoria: 'Linha Viva (LV)', Previsto: lvPrev, Mobilizado: lvMob },
      { categoria: 'Linha Morta Leve (LML)', Previsto: lmlPrev, Mobilizado: lmlMob },
      { categoria: 'Linha Morta Pesada (LMP)', Previsto: lmpPrev, Mobilizado: lmpMob }
    ];
  }, [filteredDailyData]);

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm font-semibold">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="text-center bg-white border border-rose-200 rounded-2xl p-6 max-w-sm shadow-sm">
          <p className="text-rose-600 font-bold text-sm mb-1">Erro ao carregar dados</p>
          <p className="text-slate-500 text-xs">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <ZapIcon className="w-4 h-4" />
              DCMD
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Mobilização de Equipes
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Acompanhamento diário por categoria técnica (LV, LML, LMP)
            </p>
          </div>

          {/* Date Selector & Global Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2">
              <CalendarIcon className="w-4 h-4 text-slate-500" />
              <label htmlFor="selected-date" className="text-xs font-semibold text-slate-600">Data:</label>
              <input
                id="selected-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <button
              onClick={() => handleOpenContractModal()}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <PlusIcon className="w-4 h-4" />
              Nova Empreiteira
            </button>
          </div>
        </div>
      </header>

      {/* KPI Summary Cards */}
      {}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Previsto</p>
          <p className="text-2xl font-black text-slate-800 mt-1">{summary.totalPrev}</p>
          <span className="text-[10px] text-slate-400 font-medium">Equipes em Contrato</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Mobilizado</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{summary.totalMob}</p>
          <span className="text-[10px] text-emerald-600 font-bold">{summary.taxaGeral}% da meta</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Déficit Total</p>
          <p className="text-2xl font-black text-rose-600 mt-1">-{summary.totalDeficit}</p>
          <span className="text-[10px] text-rose-500 font-semibold">{summary.countDeficit} empreiteira(s)</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Extras Enviados</p>
          <p className="text-2xl font-black text-sky-600 mt-1">+{summary.totalExtra}</p>
          <span className="text-[10px] text-sky-600 font-semibold">{summary.countExtra} empreiteira(s)</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Atualizações do Dia</p>
          <p className="text-2xl font-black text-slate-800 mt-1">{summary.countAtualizados} <span className="text-xs text-slate-400 font-normal">/ {dailyDataForSelectedDate.length}</span></p>
          <span className="text-[10px] text-amber-600 font-bold">{summary.taxaAtualizacao}% concluído</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          {summary.countPendentes > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
          )}
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Lançamentos Pendentes</p>
          <p className={`text-2xl font-black mt-1 ${summary.countPendentes > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
            {summary.countPendentes}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">Requer preenchimento</span>
        </div>
      </section>

      {/* Main Content & Controls */}
      <main className="space-y-6">
        {/* Filter Controls & Report Export Actions */}
        {}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar empreiteira..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Regional Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
              <span className="text-xs font-semibold text-slate-500">Regional:</span>
              <select
                value={selectedRegional}
                onChange={(e) => setSelectedRegional(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
              >
                {regionais.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Status Quick Filter Buttons */}
            <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl gap-1">
              {[
                { id: 'Todos', label: 'Todos' },
                { id: 'Atualizados', label: 'Atualizados' },
                { id: 'Pendentes', label: 'Pendentes' },
                { id: 'Deficit', label: 'Com Déficit' },
                { id: 'Extra', label: 'Com Extra' },
                { id: 'OK', label: 'Conforme' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                    statusFilter === f.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Export Report Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold transition shadow-sm"
              title="Exportar dados do dia selecionado"
            >
              <DownloadIcon className="w-4 h-4" />
              Exportar Dia
            </button>

            <button
              onClick={() => handleExportPeriodReport(7)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition"
              title="Baixar CSV consolidado dos últimos 7 dias"
            >
              <FileSpreadsheetIcon className="w-4 h-4 text-emerald-600" />
              Relatório 7 Dias
            </button>

            <button
              onClick={() => handleExportPeriodReport(30)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition"
              title="Baixar CSV consolidado dos últimos 30 dias"
            >
              <FileSpreadsheetIcon className="w-4 h-4 text-emerald-600" />
              Relatório 30 Dias
            </button>
          </div>

        </div>

        {/* Contractors Mobilization Table */}
        {}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  <th className="py-3.5 px-4">Empreiteira / Regional</th>
                  <th className="py-3.5 px-3 text-center">Status Lançamento</th>
                  <th className="py-3.5 px-3 text-center bg-amber-50/50 text-amber-800 border-l border-amber-100">
                    Linha Viva (LV)
                  </th>
                  <th className="py-3.5 px-3 text-center bg-sky-50/50 text-sky-800 border-l border-sky-100">
                    Linha Morta Leve (LML)
                  </th>
                  <th className="py-3.5 px-3 text-center bg-purple-50/50 text-purple-800 border-l border-purple-100">
                    Linha Morta Pesada (LMP)
                  </th>
                  <th className="py-3.5 px-3 text-center border-l border-slate-200">Total Previsto</th>
                  <th className="py-3.5 px-3 text-center">Total Mobilizado</th>
                  <th className="py-3.5 px-3 text-center">Saldo / Situação</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredDailyData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 font-medium">
                      Nenhuma empreiteira encontrada com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredDailyData.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-50/80 transition ${
                        !item.hasLog ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      {/* Name and Regional */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-sm">{item.nome}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <BuildingIcon className="w-3 h-3 text-slate-400" />
                          {item.regional}
                        </div>
                      </td>

                      {/* Daily Update Status */}
                      <td className="py-3 px-3 text-center">
                        {item.hasLog ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                            Atualizada
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                            <ClockIcon className="w-3 h-3 text-amber-600" />
                            Pendente
                          </span>
                        )}
                      </td>

                      {/* Linha Viva (LV) */}
                      <td className="py-3 px-3 text-center bg-amber-50/20 border-l border-amber-100">
                        <div className="font-semibold text-slate-700">
                          {item.hasLog ? item.mobilizadoLV : '-'} <span className="text-[10px] text-slate-400 font-normal">/ {item.previstoLV}</span>
                        </div>
                        {item.hasLog && item.deltaLV !== 0 && (
                          <span className={`text-[10px] font-bold ${item.deltaLV < 0 ? 'text-rose-600' : 'text-sky-600'}`}>
                            {item.deltaLV > 0 ? `+${item.deltaLV}` : item.deltaLV}
                          </span>
                        )}
                      </td>

                      {/* Linha Morta Leve (LML) */}
                      <td className="py-3 px-3 text-center bg-sky-50/20 border-l border-sky-100">
                        <div className="font-semibold text-slate-700">
                          {item.hasLog ? item.mobilizadoLML : '-'} <span className="text-[10px] text-slate-400 font-normal">/ {item.previstoLML}</span>
                        </div>
                        {item.hasLog && item.deltaLML !== 0 && (
                          <span className={`text-[10px] font-bold ${item.deltaLML < 0 ? 'text-rose-600' : 'text-sky-600'}`}>
                            {item.deltaLML > 0 ? `+${item.deltaLML}` : item.deltaLML}
                          </span>
                        )}
                      </td>

                      {/* Linha Morta Pesada (LMP) */}
                      <td className="py-3 px-3 text-center bg-purple-50/20 border-l border-purple-100">
                        <div className="font-semibold text-slate-700">
                          {item.hasLog ? item.mobilizadoLMP : '-'} <span className="text-[10px] text-slate-400 font-normal">/ {item.previstoLMP}</span>
                        </div>
                        {item.hasLog && item.deltaLMP !== 0 && (
                          <span className={`text-[10px] font-bold ${item.deltaLMP < 0 ? 'text-rose-600' : 'text-sky-600'}`}>
                            {item.deltaLMP > 0 ? `+${item.deltaLMP}` : item.deltaLMP}
                          </span>
                        )}
                      </td>

                      {/* Total Previsto */}
                      <td className="py-3 px-3 text-center font-bold text-slate-800 border-l border-slate-200">
                        {item.totalPrevisto}
                      </td>

                      {/* Total Mobilizado */}
                      <td className="py-3 px-3 text-center font-black text-slate-900">
                        {item.hasLog ? item.totalMobilizado : <span className="text-slate-300">-</span>}
                      </td>

                      {/* Saldo / Situação */}
                      <td className="py-3 px-3 text-center">
                        {!item.hasLog ? (
                          <span className="text-[11px] text-slate-400 font-medium">Aguardando</span>
                        ) : item.saldoTotal < 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                            <AlertTriangleIcon className="w-3 h-3 text-rose-600" />
                            Déficit: {item.saldoTotal}
                          </span>
                        ) : item.saldoTotal > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                            <TrendingUpIcon className="w-3 h-3 text-sky-600" />
                            Extra: +{item.saldoTotal}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                            100% OK
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDailyModal(item)}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition"
                            title="Lançar/Editar Mobilização Diária"
                          >
                            Lançar
                          </button>

                          <button
                            onClick={() => {
                              setHistoryContractId(item.id);
                              setHistoryDateStart('');
                              setHistoryDateEnd('');
                              setHistoryStatusFilter('Todos');
                            }}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg transition"
                            title="Ver Histórico Diário"
                          >
                            <HistoryIcon className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenContractModal(item)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg transition"
                            title="Editar Dados Contratuais"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteContract(item.id)}
                            className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                            title="Excluir Empreiteira"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Analytics / Charts Section */}
        {}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-amber-500" />
                Análise Visual & Gráficos Diários
              </h3>
              <p className="text-xs text-slate-500">
                Acompanhamento de tendências, distribuição por categoria e saldo contratual
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Tabela: Empreiteiras em Déficit da Semana */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Empreiteiras em Déficit da Semana
                </h4>
                <button
                  onClick={handleExportWeeklyDeficitCSV}
                  disabled={weeklyDeficitLogs.length === 0}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition"
                  title="Exportar tabela de déficit da semana em CSV"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  Exportar CSV
                </button>
              </div>
              <div className="h-64 overflow-y-auto text-xs">
                {weeklyDeficitLogs.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-400 font-medium">Nenhum déficit registrado nos últimos 7 dias.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-200">
                        <th className="py-2 pr-2">Empreiteira</th>
                        <th className="py-2 px-2">Regional</th>
                        <th className="py-2 px-2 text-center">Déficit</th>
                        <th className="py-2 px-2">Previsão de Mobilização</th>
                        <th className="py-2 px-2">Comentário</th>
                        <th className="py-2 pl-2">Datas Analisadas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70">
                      {weeklyDeficitLogs.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 pr-2 font-bold text-slate-800">{item.nome}</td>
                          <td className="py-2 px-2 text-slate-600">{item.regional}</td>
                          <td className="py-2 px-2 text-center">
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                              {item.saldoTotal}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-slate-600">
                            {item.semPrevisaoData ? (
                              <span className="font-semibold text-amber-600">Sem previsão até o momento</span>
                            ) : item.previsaoData ? (
                              <div>
                                <span className="font-semibold text-slate-800">{toShortDate(item.previsaoData)}</span>
                                {item.previsaoTotal > 0 && (
                                  <div className="text-[10px] text-sky-700 font-semibold">
                                    {formatPrevisaoBreakdown(item)}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-2 px-2 text-slate-600">
                            {item.justificativa || <span className="text-slate-400">-</span>}
                          </td>
                          <td className="py-2 pl-2 text-slate-500">
                            {item.datas.map(d => toShortDate(d)).join(', ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Chart 2: Tendência de Mobilização 7 Dias */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Evolução de Mobilização - Últimos 7 Dias
              </h4>
              <div className="h-64 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData7Days}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="data" tick={{ fill: '#64748B', fontSize: 11 }} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', color: '#FFF', border: 'none' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="Previsto" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Mobilizado" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Comparativo por Categoria Técnica */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Previsto vs Mobilizado por Categoria Técnica
              </h4>
              <div className="h-64 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBreakdownData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} />
                    <YAxis dataKey="categoria" type="category" tick={{ fill: '#64748B', fontSize: 11 }} width={130} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', color: '#FFF', border: 'none' }} />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="Previsto" name="Previsto" fill="#94A3B8" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="Mobilizado" name="Mobilizado" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Pie Chart - Distribuição de Status */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Status das Empreiteiras no Dia
              </h4>
              <div className="h-56 text-xs relative flex items-center justify-center">
                {pieChartData.length === 0 ? (
                  <p className="text-slate-400 font-medium">Nenhum dado para exibir no gráfico.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', color: '#FFF', border: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-xs pt-2 border-t border-slate-200">
                {pieChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600">{item.name}:</span>
                    <span className="font-bold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Modal: Cadastro/Edição de Empreiteira */}
      {}
      {isContractModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingContract ? 'Editar Contrato da Empreiteira' : 'Nova Empreiteira Contratada'}
              </h3>
              <button
                onClick={() => setIsContractModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContract} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome da Empreiteira</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: EletroServ Engenharia"
                  value={contractForm.nome}
                  onChange={(e) => setContractForm(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Regional de Atuação</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Metropolitana"
                  value={contractForm.regional}
                  onChange={(e) => setContractForm(prev => ({ ...prev, regional: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quantitativo Equipes Previsto em Contrato</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-amber-800 mb-1">Linha Viva (LV)</label>
                    <input
                      type="number"
                      min="0"
                      value={contractForm.previstoLV}
                      onChange={(e) => setContractForm(prev => ({ ...prev, previstoLV: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-sky-800 mb-1">L. Morta Leve</label>
                    <input
                      type="number"
                      min="0"
                      value={contractForm.previstoLML}
                      onChange={(e) => setContractForm(prev => ({ ...prev, previstoLML: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-purple-800 mb-1">L. Morta Pesada</label>
                    <input
                      type="number"
                      min="0"
                      value={contractForm.previstoLMP}
                      onChange={(e) => setContractForm(prev => ({ ...prev, previstoLMP: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Salvar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Lançamento Diário de Mobilização */}
      {}
      {isDailyModalOpen && selectedContractForLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Lançamento de Mobilização Diária</h3>
                <p className="text-xs text-slate-500">{selectedContractForLog.nome} - {selectedContractForLog.regional}</p>
              </div>
              <button
                onClick={() => setIsDailyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDailyLog} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Data do Lançamento</label>
                <input
                  type="date"
                  required
                  value={dailyForm.data}
                  onChange={(e) => setDailyForm(prev => ({ ...prev, data: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Equipes Efetivamente Mobilizadas</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-amber-800 mb-1">LV (Prev: {selectedContractForLog.previstoLV})</label>
                    <input
                      type="number"
                      min="0"
                      value={dailyForm.mobilizadoLV}
                      onChange={(e) => setDailyForm(prev => ({ ...prev, mobilizadoLV: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-sky-800 mb-1">LML (Prev: {selectedContractForLog.previstoLML})</label>
                    <input
                      type="number"
                      min="0"
                      value={dailyForm.mobilizadoLML}
                      onChange={(e) => setDailyForm(prev => ({ ...prev, mobilizadoLML: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-purple-800 mb-1">LMP (Prev: {selectedContractForLog.previstoLMP})</label>
                    <input
                      type="number"
                      min="0"
                      value={dailyForm.mobilizadoLMP}
                      onChange={(e) => setDailyForm(prev => ({ ...prev, mobilizadoLMP: e.target.value }))}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              {isModalDeficit && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-3">
                  <p className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangleIcon className="w-3.5 h-3.5" />
                    Déficit de {deficitAmount} equipe(s) — previsão de mobilização obrigatória
                  </p>

                  <label className="flex items-center gap-2 text-xs font-semibold text-rose-800">
                    <input
                      type="checkbox"
                      checked={dailyForm.semPrevisaoData}
                      onChange={(e) => setDailyForm(prev => ({
                        ...prev,
                        semPrevisaoData: e.target.checked,
                        previsaoData: e.target.checked ? '' : prev.previsaoData
                      }))}
                      className="w-3.5 h-3.5"
                    />
                    Sem previsão de mobilização até o momento
                  </label>

                  {!dailyForm.semPrevisaoData && (
                    <div>
                      <label className="block text-[11px] font-medium text-rose-800 mb-1">Data de Previsão de Mobilização</label>
                      <input
                        type="date"
                        required={isModalDeficit && !dailyForm.semPrevisaoData}
                        value={dailyForm.previsaoData}
                        onChange={(e) => setDailyForm(prev => ({ ...prev, previsaoData: e.target.value }))}
                        className="w-full bg-white border border-rose-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800"
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-[11px] font-medium text-rose-800 mb-1">Equipes Previstas para Mobilizar nessa Data</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-medium text-amber-800 mb-1">LV</label>
                        <input
                          type="number"
                          min="0"
                          value={dailyForm.previsaoLV}
                          onChange={(e) => setDailyForm(prev => ({ ...prev, previsaoLV: e.target.value }))}
                          className="w-full bg-white border border-rose-300 rounded-lg p-2 text-xs text-center font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-sky-800 mb-1">LML</label>
                        <input
                          type="number"
                          min="0"
                          value={dailyForm.previsaoLML}
                          onChange={(e) => setDailyForm(prev => ({ ...prev, previsaoLML: e.target.value }))}
                          className="w-full bg-white border border-rose-300 rounded-lg p-2 text-xs text-center font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-purple-800 mb-1">LMP</label>
                        <input
                          type="number"
                          min="0"
                          value={dailyForm.previsaoLMP}
                          onChange={(e) => setDailyForm(prev => ({ ...prev, previsaoLMP: e.target.value }))}
                          className="w-full bg-white border border-rose-300 rounded-lg p-2 text-xs text-center font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Justificativa do Desvio / Observações{isModalDeficit && <span className="text-rose-600"> *</span>}
                </label>
                <textarea
                  rows={3}
                  required={isModalDeficit}
                  placeholder="Descreva o motivo caso haja déficit, manutenção de frota, folga de equipe ou contingência..."
                  value={dailyForm.justificativa}
                  onChange={(e) => setDailyForm(prev => ({ ...prev, justificativa: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDailyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Registrar Mobilização
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Histórico Diário Individual */}
      {}
      {activeHistoryContract && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Histórico de Lançamentos</h3>
                <p className="text-xs text-slate-500">{activeHistoryContract.nome} - {activeHistoryContract.regional}</p>
              </div>
              <button
                onClick={() => setHistoryContractId(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros do Histórico */}
            <div className="flex flex-wrap items-center gap-2 pt-3 flex-shrink-0 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500">De:</label>
                <input
                  type="date"
                  value={historyDateStart}
                  onChange={(e) => setHistoryDateStart(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-[11px] font-semibold text-slate-500">Até:</label>
                <input
                  type="date"
                  value={historyDateEnd}
                  onChange={(e) => setHistoryDateEnd(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { id: 'Todos', label: 'Todos' },
                  { id: 'Deficit', label: 'Déficit' },
                  { id: 'Extra', label: 'Extra' },
                  { id: 'Conforme', label: 'Conforme' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setHistoryStatusFilter(f.id)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      historyStatusFilter === f.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {(historyDateStart || historyDateEnd || historyStatusFilter !== 'Todos') && (
                <button
                  onClick={() => {
                    setHistoryDateStart('');
                    setHistoryDateEnd('');
                    setHistoryStatusFilter('Todos');
                  }}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>

            <div className="overflow-y-auto my-4 space-y-3 flex-grow pr-1">
              {filteredHistoryLogs.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-xs">
                  {historyLogsForContract.length === 0
                    ? 'Nenhum lançamento registrado no histórico para esta empreiteira.'
                    : 'Nenhum lançamento encontrado com os filtros selecionados.'}
                </p>
              ) : (
                filteredHistoryLogs.map((log) => {
                  const prevTot = activeHistoryContract.previstoLV + activeHistoryContract.previstoLML + activeHistoryContract.previstoLMP;
                  const mobTot = log.mobilizadoLV + log.mobilizadoLML + log.mobilizadoLMP;
                  const diff = mobTot - prevTot;

                  return (
                    <div key={log.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800 flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                          {log.data}
                        </span>

                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          diff < 0 ? 'bg-rose-100 text-rose-800' : diff > 0 ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {diff < 0 ? `Déficit (${diff})` : diff > 0 ? `Extra (+${diff})` : 'Conforme (0)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs py-1 border-y border-slate-200/60">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">LV</span>
                          <span className="font-bold text-slate-700">{log.mobilizadoLV}</span> / <span className="text-slate-400">{activeHistoryContract.previstoLV}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">LML</span>
                          <span className="font-bold text-slate-700">{log.mobilizadoLML}</span> / <span className="text-slate-400">{activeHistoryContract.previstoLML}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">LMP</span>
                          <span className="font-bold text-slate-700">{log.mobilizadoLMP}</span> / <span className="text-slate-400">{activeHistoryContract.previstoLMP}</span>
                        </div>
                      </div>

                      {diff < 0 && (log.semPrevisaoData || log.previsaoData) && (
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 text-xs">
                          <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider mb-0.5">
                            Previsão de Mobilização
                          </p>
                          {log.semPrevisaoData ? (
                            <span className="font-semibold text-amber-700">Sem previsão até o momento</span>
                          ) : (
                            <span className="text-slate-700">
                              <span className="font-semibold">{toShortDate(log.previsaoData)}</span>
                              {(log.previsaoLV > 0 || log.previsaoLML > 0 || log.previsaoLMP > 0) && (
                                <span className="ml-1 text-sky-700 font-semibold">
                                  ({formatPrevisaoBreakdown(log)})
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      )}

                      {log.justificativa && (
                        <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200 italic">
                          "{log.justificativa}"
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button
                onClick={() => setHistoryContractId(null)}
                className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {}
      <footer className="mt-8 text-center text-xs text-slate-400">
        Dashboard de Gestão de Mobilização de Equipes Energisa DCMD &copy; 2026 | Desenvolvido por Lorena Curvo
      </footer>
    </div>
  );
}
