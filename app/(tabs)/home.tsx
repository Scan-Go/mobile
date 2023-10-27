import { supabase } from '@/lib/services/supabase';
import { Database } from '@/lib/typedefs/database.types';
import { useToastController } from '@tamagui/toast';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text } from 'react-native';
import { Spinner } from 'tamagui';

export default function Home() {
  const [notes, setNotes] = useState<
    Database['public']['Tables']['note']['Row'][]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toastController = useToastController();

  const fetchNotes = useCallback(() => {
    supabase
      .from('note')
      .select('*')
      .then((response) => {
        if (response.error) {
          toastController.show('Kunde inte nå notes', { toastType: 'error' });
          return;
        }

        setNotes(response.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchNotes();

    toastController.show('selam');
  }, [fetchNotes]);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (notes.length < 1) {
    return (
      <RefreshControl
        onRefresh={fetchNotes}
        refreshing={isLoading}
      >
        <Text>No new note</Text>
      </RefreshControl>
    );
  }

  return (
    <>
      {notes.map((note) => (
        <Text key={note.id}>{note.content}</Text>
      ))}
    </>
  );
}
