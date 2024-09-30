import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useCurrentWebsite } from '../hooks/useCurrentWebsite';
import { useAuth } from './AuthContext';

const DiscussionContext = createContext();
const WALRUS_PUBLISHER = 'https://publisher-devnet.walrus.space';
const WALRUS_AGGREGATOR = 'https://aggregator-devnet.walrus.space';
const EPOCHS = '5';

export function DiscussionProvider({ children }) {
  const [discussions, setDiscussions] = useState([]);
  const [currentWebsiteId, setCurrentWebsiteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentWebsite = useCurrentWebsite();
  const { user } = useAuth();

  useEffect(() => {
    if (currentWebsite) {
      getOrCreateWebsite();
    } else {
      setIsLoading(false);
    }
  }, [currentWebsite]);

  const getOrCreateWebsite = async () => {
    if (!currentWebsite) return;

    setIsLoading(true);

    // First, try to get the website
    let { data: website, error } = await supabase
      .from('websites')
      .select('id, name')
      .eq('domain', currentWebsite)
      .single();

    if (error && error.code === 'PGRST116') {
      // Website not found, so create it
      const { data: newWebsite, error: insertError } = await supabase
        .from('websites')
        .insert({ domain: currentWebsite, name: currentWebsite })
        .single();

      if (insertError) {
        console.error('Error creating website:', insertError);
        setIsLoading(false);
        return;
      }

      website = newWebsite;
    } else if (error) {
      console.error('Error fetching website:', error);
      setIsLoading(false);
      return;
    }

    setCurrentWebsiteId(website.id);
    await fetchDiscussions(website.id);
    setIsLoading(false);
  };

  const fetchDiscussions = async (websiteId) => {
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        *,
        user:user_id (
          id,
          email,
          username,
          avatar_url,
          role
        ),
        website:website_id (
          domain
        ),
        parent:parent_id (
          id,
          content
        )
      `)
      .eq('website_id', websiteId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching discussions:', error);
    } else {
      setDiscussions(data);
    }
  };

  const addDiscussion = async (content, parentId = null, mediaFile = null) => {
    if (!user || !currentWebsiteId) return;

    let mediaBlobId = null;
    let mediaFileName = null;
    let mediaType = null;
    let mediaBlobUrl = null;

    if (mediaFile) {
      try {
        const uploadResponse = await fetch(`${WALRUS_PUBLISHER}/v1/store?epochs=${EPOCHS}`, {
          method: 'PUT',
          headers: {
            'Content-Type': mediaFile.type,
          },
          body: mediaFile,
        });

        if (uploadResponse.status === 200) {
          const info = await uploadResponse.json();
          if (info.alreadyCertified) {
            mediaBlobId = info.alreadyCertified.blobId;
          } else if (info.newlyCreated) {
            mediaBlobId = info.newlyCreated.blobObject.blobId;
          }
          mediaBlobUrl = `${WALRUS_AGGREGATOR}/v1/${mediaBlobId}`;
          mediaFileName = mediaFile.name;
          mediaType = mediaFile.type;
        } else {
          throw new Error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading media:', error);
        return null;
      }
    }

    const { data, error } = await supabase
      .from('discussions')
      .insert([
        { 
          website_id: currentWebsiteId, 
          user_id: user.id, 
          content,
          parent_id: parentId,
          status: 'active',
          media_blob_id: mediaBlobId,
          media_file_name: mediaFileName,
          media_type: mediaType,
          media_blob_url: mediaBlobUrl
        }
      ])
      .select(`
        *,
        user:user_id (
          id,
          email,
          username,
          avatar_url,
          role
        ),
        website:website_id (
          domain
        ),
        parent:parent_id (
          id,
          content
        )
      `);

    if (error) {
      console.error('Error adding discussion:', error);
    } else {
      setDiscussions(prevDiscussions => [...prevDiscussions, data[0]]);
    }
  };

  return (
    <DiscussionContext.Provider value={{ discussions, addDiscussion, currentWebsite, isLoading }}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  return useContext(DiscussionContext);
}