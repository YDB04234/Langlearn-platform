import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  Headphones, Play, Pause, Volume2, CheckCircle2,
  SkipForward, RefreshCw, Sparkles, Volume1, VolumeX
} from 'lucide-react';

interface ListeningItem {
  id: string;
  audioText: string;
  question: string;
  options: string[];
  correctAnswer: string;
  transcript: string;
}

const sampleItems: ListeningItem[] = [
  {
    id: '1',
    audioText: 'Hello, welcome to our English course. Today we will learn some basic greetings.',
    question: '这段音频主要讲的是什么？',
    options: ['学习语法', '基本问候语', '英语课程介绍', '词汇记忆'],
    correctAnswer: '基本问候语',
    transcript: 'Hello, welcome to our English course. Today we will learn some basic greetings.',
  },
  {
    id: '2',
    audioText: 'Good morning! How are you doing today? I hope you are having a wonderful day.',
    question: '说话人在问候时提到了什么？',
    options: ['天气', '心情', '时间', '工作'],
    correctAnswer: '心情',
    transcript: 'Good morning! How are you doing today? I hope you are having a wonderful day.',
  },
  {
    id: '3',
    audioText: 'Nice to meet you. My name is Tom. I am from Beijing, China.',
    question: 'Tom 来自哪里？',
    options: ['上海', '北京', '广州', '深圳'],
    correctAnswer: '北京',
    transcript: 'Nice to meet you. My name is Tom. I am from Beijing, China.',
  },
  {
    id: '4',
    audioText: 'Let us practice together. Repeat after me: Hello, how are you?',
    question: '音频中要求做什么？',
    options: ['阅读', '写作', '跟读练习', '听力测试'],
    correctAnswer: '跟读练习',
    transcript: 'Let us practice together. Repeat after me: Hello, how are you?',
  },
  {
    id: '5',
    audioText: 'Thank you for learning with us today. See you tomorrow!',
    question: '说话人的意图是什么？',
    options: ['道歉', '感谢和告别', '邀请', '提问'],
    correctAnswer: '感谢和告别',
    transcript: 'Thank you for learning with us today. See you tomorrow!',
  },
];

export default function ListeningModule() {
  const { isAuthenticated, addXP } = useAuthStore();
  const [items] = useState<ListeningItem[]>(sampleItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentItem = items[currentIndex];

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentItem.audioText);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setHasPlayed(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === currentItem.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
      addXP(15);
    }
  };

  const nextItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setHasPlayed(false);
    } else {
      setFinished(true);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setHasPlayed(false);
    setScore(0);
    setFinished(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Headphones className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">听力训练</h2>
          <p className="text-gray-600 mb-6">登录后开始听力练习</p>
        </Card>
      </div>
    );
  }

  if (finished) {
    const accuracy = Math.round((score / items.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
              <Headphones className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">练习完成！</h2>
            <p className="text-gray-600 mb-8">你的听力表现</p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">{items.length}</p>
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

            <Button onClick={resetPractice}>
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
          <h1 className="text-2xl font-bold text-gray-900">听力训练</h1>
          <p className="text-gray-600">提升听力理解能力</p>
        </div>
        <div className="text-lg font-bold text-green-600">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      <Card className="mb-6">
        <ProgressBar 
          value={currentIndex + 1} 
          max={items.length} 
          color="from-green-500 to-emerald-500" 
        />
      </Card>

      <Card className="mb-6">
        <div className="text-center py-8">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center transition-all ${
            hasPlayed ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-100'
          }`}>
            <button
              onClick={isPlaying ? stopAudio : playAudio}
              className="w-full h-full flex items-center justify-center"
            >
              {isPlaying ? (
                <div className="flex items-center gap-1">
                  <Volume2 className="text-white animate-pulse" size={32} />
                </div>
              ) : (
                <Play className={`${hasPlayed ? 'text-white' : 'text-gray-400'}`} size={40} />
              )}
            </button>
          </div>
          
          {!hasPlayed && (
            <p className="text-gray-500 mb-4">点击播放音频</p>
          )}
          
          {hasPlayed && (
            <p className="text-green-600 font-medium mb-4">音频已播放</p>
          )}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentItem.question}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {currentItem.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  showResult
                    ? option === currentItem.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 text-gray-400'
                    : option === selectedAnswer
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className={`p-4 rounded-xl ${
              isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-amber-50 border-2 border-amber-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {isCorrect ? (
                  <CheckCircle2 className="text-green-600" size={24} />
                ) : (
                  <span className="text-amber-600 text-xl">⚠️</span>
                )}
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </span>
              </div>
              {!isCorrect && (
                <p className="text-gray-700">
                  正确答案：<span className="font-semibold text-green-600">{currentItem.correctAnswer}</span>
                </p>
              )}
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">听力原文：</p>
              <p className="text-gray-700 italic">{currentItem.transcript}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={nextItem}>
                {currentIndex < items.length - 1 ? (
                  <>
                    下一题
                    <SkipForward className="ml-2" size={18} />
                  </>
                ) : (
                  '查看结果'
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {!showResult && selectedAnswer && (
          <div className="mt-6 flex justify-end">
            <Button onClick={submitAnswer}>
              提交答案
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Sparkles className="text-green-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">听力练习技巧</h4>
            <p className="text-sm text-gray-600">先完整听一遍音频，理解大意后再听细节</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
