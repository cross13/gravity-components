import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  TopClientsWidget,
  type TopClientRow,
} from '../src/components/widgets/TopClientsWidget'

const meta: Meta<typeof TopClientsWidget> = {
  title: 'Widgets/Dashboard',
  component: TopClientsWidget,
  parameters: { layout: 'padded' },
}

export default meta

const mockTopClients: TopClientRow[] = [
  {
    id: '1',
    firstName: 'Martín',
    lastName: 'García',
    email: 'm.garcia@email.com',
    walletLabel: 'Agresiva — Dólar',
    amountArs: 2_180_000_000,
    amountUsd: 1_535_211,
  },
  {
    id: '2',
    firstName: 'Sofía',
    lastName: 'Fernández',
    email: 'sofia.fernandez@empresa.com.ar',
    walletLabel: 'Moderada — Pesos',
    amountArs: 1_420_000_000,
    amountUsd: 1_000_000,
  },
  {
    id: '3',
    firstName: 'Ricardo',
    lastName: 'Becerra',
    email: 'rbecerra@gmail.com',
    walletLabel: 'Conservadora — Pesos',
    amountArs: 980_500_000,
    amountUsd: 691_197,
  },
  {
    id: '4',
    firstName: 'Camila',
    lastName: 'López',
    email: 'camila.lopez@outlook.com',
    walletLabel: 'Moderada — Dólar',
    amountArs: 612_000_000,
    amountUsd: 431_000,
  },
  {
    id: '5',
    firstName: 'Juan',
    lastName: 'Martínez',
    email: 'jmartinez@instituto.org',
    walletLabel: 'Agresiva — Pesos',
    amountArs: 445_000_000,
    amountUsd: 313_380,
  },
  {
    id: '6',
    firstName: 'Valentina',
    lastName: 'Ruiz',
    email: 'v.ruiz@mail.com',
    walletLabel: 'Conservadora — Dólar',
    amountArs: 398_000_000,
    amountUsd: 280_282,
  },
  {
    id: '7',
    firstName: 'Diego',
    lastName: 'Acosta',
    email: 'dacosta@empresa.com',
    walletLabel: 'Moderada — Pesos',
    amountArs: 312_400_000,
    amountUsd: 220_000,
  },
  {
    id: '8',
    firstName: 'Lucía',
    lastName: 'Herrera',
    email: 'lucia.herrera@pm.me',
    walletLabel: 'Moderada — Pesos',
    amountArs: 289_000_000,
    amountUsd: 203_521,
  },
  {
    id: '9',
    firstName: 'Federico',
    lastName: 'Núñez',
    email: 'fnunez@yahoo.com.ar',
    walletLabel: 'Conservadora — Pesos',
    amountArs: 201_000_000,
    amountUsd: 141_549,
  },
  {
    id: '10',
    firstName: 'Paula',
    lastName: 'Domínguez',
    email: 'paula.dominguez@live.com',
    walletLabel: 'Agresiva — Dólar',
    amountArs: 178_500_000,
    amountUsd: 125_704,
  },
  {
    id: '11',
    firstName: 'Extra',
    lastName: 'Cliente',
    email: 'extra@example.com',
    walletLabel: 'Moderada — Pesos',
    amountArs: 50_000_000,
    amountUsd: 35_211,
  },
]

export const TopClientesAdmin: StoryObj<typeof TopClientsWidget> = {
  name: 'Top clientes por monto — Admin',
  args: {
    clients: mockTopClients,
    viewerRole: 'admin',
    maxItems: 10,
  },
}

export const TopClientesAsesor: StoryObj<typeof TopClientsWidget> = {
  name: 'Top clientes por monto — Asesor',
  args: {
    clients: mockTopClients.slice(0, 8),
    viewerRole: 'advisor',
    advisorName: 'María López',
    maxItems: 10,
  },
}

export const TopClientesVacio: StoryObj<typeof TopClientsWidget> = {
  name: 'Top clientes — Sin datos',
  args: {
    clients: [],
    viewerRole: 'advisor',
    advisorName: 'Carlos Pérez',
  },
}
