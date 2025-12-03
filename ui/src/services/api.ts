import type { Amiibo } from '../types/amiibo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const amiiboApi = {
  async getAll(): Promise<Amiibo[]> {
    const response = await fetch(`${API_BASE_URL}/amiibo/`);
    if (!response.ok) {
      throw new Error('Failed to fetch amiibos');
    }
    return response.json();
  },

  async getById(id: number): Promise<Amiibo> {
    const response = await fetch(`${API_BASE_URL}/amiibo/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch amiibo');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/amiibo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete amiibo');
    }
  },
};
