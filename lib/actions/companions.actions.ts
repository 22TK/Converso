'use server'

import { createSupabaseClient } from "@/lib/supabase";

interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
    userId: string;
}

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId, ...companionData } = formData;
    
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        const supabase = createSupabaseClient();
        
        // First, let's check the table structure
        const { data: tableInfo, error: tableError } = await supabase
            .from('information_schema.columns')
            .select('column_name, data_type')
            .eq('table_name', 'companions');
            
        console.log('Table structure:', tableInfo);

        // Prepare companion data with auto-generated UUID
        const newCompanion = {
            name: companionData.name,
            subject: companionData.subject,
            topic: companionData.topic,
            voice: companionData.voice,
            style: companionData.style,
            duration: companionData.duration,
            created_at: new Date().toISOString()
        };
        
        console.log('Attempting to insert companion:', newCompanion);
        
        // First, try to insert without specifying ID
        const { data, error } = await supabase
            .from('companions')
            .insert(newCompanion)
            .select()
            .single();

        if (error) {
            throw new Error(`Database error: ${error.message}`);
        }

        if (!data) {
            throw new Error('No data returned from database');
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to create companion');
    }
}