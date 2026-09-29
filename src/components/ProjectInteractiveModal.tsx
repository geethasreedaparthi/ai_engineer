import React, { useEffect, useState } from 'react';
import { X, Play, Code2, Check, Copy, ExternalLink, RotateCcw } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectInteractiveModalProps {
  project: ProjectItem | null;
  githubUrl: string;
  isDark: boolean;
  onClose: () => void;
  onRequestCustomize?: () => void;
}

export const ProjectInteractiveModal: React.FC<ProjectInteractiveModalProps> = ({
  project,
  githubUrl,
  isDark,
  onClose,
  onRequestCustomize,
}) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'code'>('interactive');
  const [copiedCode, setCopiedCode] = useState(false);

  // Project 1 state: Voter Eligibility Calculator
  const [voterAge, setVoterAge] = useState<string>('19');
  const [isCitizen, setIsCitizen] = useState<boolean>(true);
  const [hasVoterId, setHasVoterId] = useState<boolean>(true);

  // Project 2 state: ATM Management System
  const [atmBalance, setAtmBalance] = useState<number>(5000);
  const [atmAmount, setAtmAmount] = useState<string>('1000');
  const [atmFeedback, setAtmFeedback] = useState<{ type: 'info' | 'error'; text: string }>({
    type: 'info',
    text: 'Session active. Initial account balance: ₹5,000.00',
  });
  const [atmHistory, setAtmHistory] = useState<string[]>([
    'Session initialized · Opening balance: ₹5,000.00',
  ]);

  // Project 3 state: Student Grade Calculator
  const [marks, setMarks] = useState<number[]>([88, 92, 79, 85, 90]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Voter eligibility calculation matching Python logic
  const evaluateVoter = () => {
    const parsedAge = Number(voterAge);
    if (voterAge.trim() === '' || Number.isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      return {
        eligible: false,
        status: 'Invalid Age Input',
        reason: 'Please enter a valid age between 0 and 120 years.',
      };
    }
    if (!isCitizen) {
      return {
        eligible: false,
        status: 'Not Eligible',
        reason: 'Citizenship condition is not met.',
      };
    }
    if (parsedAge < 18) {
      const remaining = 18 - parsedAge;
      return {
        eligible: false,
        status: 'Not Yet Eligible (Under 18)',
        reason: `Minimum voting age is 18. Eligible in ${remaining} year${remaining === 1 ? '' : 's'}.`,
      };
    }
    if (!hasVoterId) {
      return {
        eligible: false,
        status: 'Registration Required',
        reason: 'Age requirement (18+) is satisfied, but a registered Voter ID is required.',
      };
    }
    return {
      eligible: true,
      status: 'Eligible to Vote',
      reason: 'All predefined age (18+), citizenship, and registration criteria are met.',
    };
  };

  // ATM actions matching Python logic
  const handleAtmDeposit = () => {
    const amount = Number(atmAmount);
    if (Number.isNaN(amount) || amount <= 0) {
      setAtmFeedback({ type: 'error', text: 'Deposit amount must be greater than ₹0.' });
      return;
    }
    const nextBalance = atmBalance + amount;
    setAtmBalance(nextBalance);
    setAtmFeedback({
      type: 'info',
      text: `Deposited ₹${amount.toLocaleString('en-IN')}. Updated balance: ₹${nextBalance.toLocaleString('en-IN')}`,
    });
    setAtmHistory((prev) => [
      `+ Deposit ₹${amount.toLocaleString('en-IN')} · Balance: ₹${nextBalance.toLocaleString('en-IN')}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleAtmWithdraw = () => {
    const amount = Number(atmAmount);
    if (Number.isNaN(amount) || amount <= 0) {
      setAtmFeedback({ type: 'error', text: 'Withdrawal amount must be greater than ₹0.' });
      return;
    }
    if (amount > atmBalance) {
      setAtmFeedback({
        type: 'error',
        text: `Insufficient balance. Requested ₹${amount.toLocaleString('en-IN')}, available ₹${atmBalance.toLocaleString('en-IN')}.`,
      });
      return;
    }
    const nextBalance = atmBalance - amount;
    setAtmBalance(nextBalance);
    setAtmFeedback({
      type: 'info',
      text: `Withdrew ₹${amount.toLocaleString('en-IN')}. Remaining balance: ₹${nextBalance.toLocaleString('en-IN')}`,
    });
    setAtmHistory((prev) => [
      `- Withdrawal ₹${amount.toLocaleString('en-IN')} · Balance: ₹${nextBalance.toLocaleString('en-IN')}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleAtmReset = () => {
    setAtmBalance(5000);
    setAtmAmount('1000');
    setAtmFeedback({
      type: 'info',
      text: 'Session reset to initial balance of ₹5,000.00.',
    });
    setAtmHistory(['Session reset · Opening balance: ₹5,000.00']);
  };

  // Student grade calculation matching Python logic
  const evaluateGrades = () => {
    const validMarks = marks.map((m) => Math.min(100, Math.max(0, Number(m) || 0)));
    const total = validMarks.reduce((acc, curr) => acc + curr, 0);
    const maxMarks = validMarks.length * 100;
    const percentage = (total / maxMarks) * 100;

    let grade = 'F';
    let remark = 'Needs Improvement';
    if (percentage >= 90) {
      grade = 'A+';
      remark = 'Outstanding Performance';
    } else if (percentage >= 80) {
      grade = 'A';
      remark = 'Excellent';
    } else if (percentage >= 70) {
      grade = 'B';
      remark = 'Good';
    } else if (percentage >= 60) {
      grade = 'C';
      remark = 'Satisfactory';
    } else if (percentage >= 50) {
      grade = 'D';
      remark = 'Pass';
    }

    return {
      total,
      maxMarks,
      percentage: percentage.toFixed(2),
      grade,
      remark,
    };
  };

  const voterResult = evaluateVoter();
  const gradeResult = evaluateGrades();

  const subjectNames = [
    'Programming in Python',
    'Engineering Mathematics I',
    'Web Technologies Intro',
    'Problem Solving & Logic',
    'Foundations of AI',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-3xl rounded-2xl border transition-colors overflow-hidden ${
          isDark
            ? 'bg-[#0F172A] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`flex items-start justify-between gap-4 px-6 py-5 border-b ${
            isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
              <span>Project {project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.fileName}</span>
              <span aria-hidden="true">·</span>
              <span>Python</span>
            </div>
            <h3 id="modal-project-title" className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b ${
            isDark ? 'border-slate-800 bg-[#0B1120]' : 'border-slate-200 bg-slate-100/70'
          }`}
        >
          <div
            className={`inline-flex p-1 rounded-lg ${
              isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200/80'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'interactive'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Interactive Logic Simulation</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'code'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Source ({project.fileName})</span>
            </button>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (
                (githubUrl.includes('YOUR_USERNAME') || githubUrl.includes('[YOUR')) &&
                onRequestCustomize
              ) {
                e.preventDefault();
                onClose();
                onRequestCustomize();
              }
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'interactive' ? (
            <div className="space-y-6">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {project.description} Test the program&apos;s conditional and arithmetic logic directly below:
              </p>

              {/* SIMULATOR 1: VOTER ELIGIBILITY CALCULATOR */}
              {project.id === 'voter-eligibility' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-5 rounded-xl border space-y-4 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <h4 className="text-sm font-semibold">Input Parameters</h4>
                    <div>
                      <label
                        htmlFor="voter-age-input"
                        className={`block text-xs font-medium mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Applicant Age (Years)
                      </label>
                      <input
                        id="voter-age-input"
                        type="number"
                        min={0}
                        max={120}
                        value={voterAge}
                        onChange={(e) => setVoterAge(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <label className="flex items-center gap-3 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isCitizen}
                          onChange={(e) => setIsCitizen(e.target.checked)}
                          className="w-4 h-4 rounded accent-blue-600"
                        />
                        <span>Meets Citizenship Condition</span>
                      </label>

                      <label className="flex items-center gap-3 text-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={hasVoterId}
                          onChange={(e) => setHasVoterId(e.target.checked)}
                          className="w-4 h-4 rounded accent-blue-600"
                        />
                        <span>Holds Registered Voter ID</span>
                      </label>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 text-slate-100 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-2">
                        python3 voter_eligibility.py — Output
                      </div>
                      <div className="text-base font-semibold text-white mb-2">
                        Status: {voterResult.status}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{voterResult.reason}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>Return value: eligible = {voterResult.eligible ? 'True' : 'False'}</span>
                      <span>Threshold: 18+ yrs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 2: ATM MANAGEMENT SYSTEM */}
              {project.id === 'atm-management' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-5 rounded-xl border space-y-4 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Transaction Controls</h4>
                      <button
                        type="button"
                        onClick={handleAtmReset}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Available Balance</div>
                      <div className="text-2xl font-bold font-mono tabular-nums mt-0.5">
                        ₹{atmBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="atm-amount-input"
                        className={`block text-xs font-medium mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Transaction Amount (₹)
                      </label>
                      <input
                        id="atm-amount-input"
                        type="number"
                        min={100}
                        step={100}
                        value={atmAmount}
                        onChange={(e) => setAtmAmount(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleAtmDeposit}
                        className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Deposit Amount
                      </button>
                      <button
                        type="button"
                        onClick={handleAtmWithdraw}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                          isDark
                            ? 'border-slate-700 hover:bg-slate-800 text-slate-100'
                            : 'border-slate-300 hover:bg-slate-200/60 text-slate-800'
                        }`}
                      >
                        Withdraw Amount
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 text-slate-100 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-2">
                        python3 atm_management.py — Session Log
                      </div>
                      <div
                        className={`p-3 rounded-lg text-xs font-mono mb-4 border ${
                          atmFeedback.type === 'error'
                            ? 'bg-red-950/50 border-red-800/70 text-red-200'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200'
                        }`}
                      >
                        {atmFeedback.text}
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-xs font-medium text-slate-400">Recent Transactions:</div>
                        {atmHistory.map((item, idx) => (
                          <div key={idx} className="text-xs font-mono text-slate-300 truncate">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 3: STUDENT GRADE CALCULATOR */}
              {project.id === 'student-grade' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-5 rounded-xl border space-y-3 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <h4 className="text-sm font-semibold">Enter Subject Marks (0 – 100)</h4>
                    {subjectNames.map((subject, idx) => (
                      <div key={subject} className="flex items-center justify-between gap-3">
                        <label
                          htmlFor={`subject-mark-${idx}`}
                          className={`text-xs truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                        >
                          {subject}
                        </label>
                        <input
                          id={`subject-mark-${idx}`}
                          type="number"
                          min={0}
                          max={100}
                          value={marks[idx]}
                          onChange={(e) => {
                            const next = [...marks];
                            next[idx] = Number(e.target.value);
                            setMarks(next);
                          }}
                          className={`w-20 px-2.5 py-1.5 rounded-lg border text-xs font-mono text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDark
                              ? 'bg-slate-950 border-slate-700 text-white'
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 text-slate-100 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-3">
                        python3 student_grade_calculator.py — Report
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/80">
                          <div className="text-xs text-slate-400">Total Score</div>
                          <div className="text-lg font-bold font-mono tabular-nums text-white mt-0.5">
                            {gradeResult.total} / {gradeResult.maxMarks}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/80">
                          <div className="text-xs text-slate-400">Percentage</div>
                          <div className="text-lg font-bold font-mono tabular-nums text-white mt-0.5">
                            {gradeResult.percentage}%
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-lg bg-blue-950/40 border border-blue-800/60">
                        <div className="text-xs text-blue-300">Calculated Grade & Evaluation</div>
                        <div className="text-xl font-bold text-white mt-0.5">
                          Grade {gradeResult.grade} · {gradeResult.remark}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
                      Rubric: A+ (90+) · A (80-89) · B (70-79) · C (60-69) · D (50-59)
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {project.fileName} · Learning Focus: {project.learningFocus}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 text-xs font-mono leading-relaxed overflow-x-auto">
                <code>{project.pythonCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
