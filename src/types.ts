export type SubsystemId = 'body' | 'chassis' | 'suspension' | 'transmission' | 'electronics' | 'wheels'

export type MetricSet = {
  clearance: number
  travel: number
  mass: number
  speed: number
}

export type PartOption = {
  id: string
  code: string
  name: string
  summary: string
  status: 'compatible' | 'adapter' | 'modification'
  price: number
  specs: Record<string, string>
  delta: Partial<MetricSet>
}

export type Subsystem = {
  id: SubsystemId
  label: string
  selectedName: string
  code: string
  group: string
  details: Array<[string, string]>
  filters: Array<{ label: string; value: string }>
  options: PartOption[]
}
