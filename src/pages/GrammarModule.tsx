import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  CheckCircle2, XCircle, Lightbulb, ChevronRight,
  Sparkles, ArrowRight, BookOpen
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: '"I ___ happy to see you." 正确填空是：',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'am',
    explanation: 'I 是第一人称单数，后面应该用 am。I\'m = I am。',
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: '早上见面应该说：',
    options: ['Good night', 'Good morning', 'Goodbye', 'Thank you'],
    correctAnswer: 'Good morning',
    explanation: 'Good morning 是早上打招呼的常用语。Good night 是晚上睡前道别用的。',
  },
  {
    id: '3',
    type: 'fill-blank',
    question: '___ name is Tom. (我的)',
    correctAnswer: 'My',
    explanation: '表示"我的"应该用 My，后面直接跟名词。',
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: '"What\'s ___ job?" - "I\'m a teacher."',
    options: ['your', 'you', 'yours', ' yourself'],
    correctAnswer: 'your',
    explanation: 'What\'s your job? 是询问职业的常用表达。',
  },
  {
    id: '5',
    type: 'fill-blank',
    question: 'I ___ from China. (是)',
    correctAnswer: 'am',
    explanation: '主语是 I 时，be 动词用 am。I am from... = 我来自...',
  },
];

export default function GrammarModule() {
  const { isAuthenticated, addXP } = useAuthStore();
  const [questions] = useState<Question[]>(sampleQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      addXP(15);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-purple-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">语法练习</h2>
          <p className="text-gray-600 mb-6">登录后开始语法练习</p>
        </Card>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center py-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              accuracy >= 80 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
              accuracy >= 60 ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
              'bg-gradient-to-br from-red-400 to-rose-500'
            }`}>
              <CheckCircle2 className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">练习完成！</h2>
            <p className="text-gray-600 mb-8">你的语法掌握程度</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">{questions.length}</p>
                <p className="text-sm text-gray-500">总题数</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-gray-500">答对</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
                <p className="text-sm text-gray-500">正确率</p>
              </div>
            </div>

            <Button onClick={resetQuiz} className="mx-auto">
              再练一次
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">语法练习</h1>
          <p className="text-gray-600">巩固语法知识，提升表达能力</p>
        </div>
        <div className="text-lg font-bold text-primary-english">
          {score} / {questions.length} 分
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
            题目 {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-600">{progress}% 完成</span>
        </div>
        <ProgressBar value={progress} color="from-purple-500 to-pink-500" />
      </Card>

      <Card className="mb-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentQuestion.question}
          </h3>
        </div>

        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  showResult
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-400'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                <span className="text-lg">{option}</span>
              </motion.button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'fill-blank' && (
          <div className="space-y-4">
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => !showResult && handleAnswer(e.target.value)}
              placeholder="输入你的答案"
              disabled={showResult}
              className={`w-full p-4 border-2 rounded-xl text-lg font-medium transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100'
              }`}
            />
            {showResult && !isCorrect && (
              <p className="text-red-600 font-medium">
                正确答案：{currentQuestion.correctAnswer}
              </p>
            )}
          </div>
        )}
      </Card>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="text-white" size={20} />
                ) : (
                  <XCircle className="text-white" size={20} />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </h4>
                <div className="flex items-start gap-2">
                  <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? (
                <>
                  下一题
                  <ArrowRight className="ml-2" size={18} />
                </>
              ) : (
                '查看结果'
              )}
            </Button>
          </div>
        </motion.div>
      )}

      <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">语法学习技巧</h4>
            <p className="text-sm text-gray-600">理解语法规则的最佳方式是多做练习，结合语境记忆</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
