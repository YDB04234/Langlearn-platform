import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { 
  Mic, Square, Play, Pause, Volume2, RefreshCw,
  CheckCircle2, Star, Sparkles, SkipForward
} from 'lucide-react';

interface SpeakingItem {
  id: string;
  text: string;
  translation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleItems: SpeakingItem[] = [
  { id: '1', text: 'Hello, how are you?', translation: '你好，你怎么样？', difficulty: 'easy' },
  { id: '2', text: 'Nice to meet you!', translation: '很高兴认识你！', difficulty: 'easy' },
  { id: '3', text: 'I am learning English.', translation: '我正在学习英语。', difficulty: 'medium' },
  { id: '4', text: 'Where are you from?', translation: '你来自哪里？', difficulty: 'easy' },
  { id: '5', text: 'Could you please repeat that?', translation: '请你再说一遍好吗？', difficulty: 'medium' },
];

export default function SpeakingModule() {
  const { isAuthenticated, addXP } = useAuthStore();
  const [items] = useState<SpeakingItem[]>(sampleItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentItem = items[currentIndex];

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, 5000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecording(true);
    }
  };

  const playOriginal = () => {
    const utterance = new SpeechSynthesisUtterance(currentItem.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
  };

  const submitRecording = () => {
    const simulatedScore = Math.floor(Math.random() * 20) + 80;
    setScore(simulatedScore);
    setShowResult(true);
    addXP(20);
  };

  const nextItem = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecording(false);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setHasRecording(false);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-600';
    if (s >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
            <Mic className="text-pink-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">口语跟读</h2>
          <p className="text-gray-600 mb-6">登录后开始口语练习</p>
        </Card>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mx-auto mb-6">
              <Star className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">练习完成！</h2>
            <p className="text-gray-600 mb-8">你的口语表现</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-4xl font-bold text-pink-600">{Math.round(score / items.length)}</p>
                <p className="text-sm text-gray-500">平均分数</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">{items.length}</p>
                <p className="text-sm text-gray-500">完成练习</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetPractice}>
                再练一次
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">口语跟读</h1>
          <p className="text-gray-600">练习标准发音，提升口语流利度</p>
        </div>
        <div className="text-lg font-bold text-pink-600">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
            currentItem.difficulty === 'medium' ? 'bg-amber-100 text-amber-600' :
            'bg-red-100 text-red-600'
          }`}>
            {currentItem.difficulty === 'easy' ? '简单' : currentItem.difficulty === 'medium' ? '中等' : '困难'}
          </span>
        </div>

        <div className="text-center py-8">
          <button
            onClick={playOriginal}
            className="mb-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <Volume2 size={20} />
            <span>点击听原音</span>
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentItem.text}</h2>
          <p className="text-lg text-gray-600">{currentItem.translation}</p>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          {!showResult ? (
            <>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-gradient-to-br from-red-400 to-rose-500 animate-pulse shadow-lg shadow-red-200' 
                  : hasRecording 
                  ? 'bg-gradient-to-br from-pink-400 to-rose-500' 
                  : 'bg-gray-100'
              }`}>
                <button
                  onClick={isRecording ? stopRecording : (hasRecording ? submitRecording : startRecording)}
                  className="w-full h-full flex items-center justify-center"
                >
                  {isRecording ? (
                    <Square className="text-white" size={40} />
                  ) : hasRecording ? (
                    <CheckCircle2 className="text-white" size={40} />
                  ) : (
                    <Mic className="text-gray-400" size={40} />
                  )}
                </button>
              </div>
              <p className="text-gray-600">
                {!hasRecording ? '点击开始录音' : '点击提交录音'}
              </p>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
                {score}
              </div>
              <p className="text-gray-600 mb-6">
                {score >= 90 ? '发音非常标准！' :
                 score >= 70 ? '发音不错，继续加油！' :
                 '需要多加练习哦！'}
              </p>
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
            </motion.div>
          )}
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
            <Sparkles className="text-pink-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">口语练习技巧</h4>
            <p className="text-sm text-gray-600">先听原音，模仿语调，注意连读和重音</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
