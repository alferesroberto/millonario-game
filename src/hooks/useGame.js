// src/hooks/useGame.js
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export const useGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestion = async (level) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('level', level)
      .single(); // Trae una pregunta aleatoria de ese nivel
    
    if (data) setQuestion(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion(currentLevel);
  }, [currentLevel]);

  return { question, currentLevel, setCurrentLevel, loading };
};