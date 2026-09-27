import type { MetricSet, Subsystem } from './types'

export const baseMetrics: MetricSet = {
  clearance: 58,
  travel: 22,
  mass: 1240,
  speed: 7.8,
}

export const subsystems: Subsystem[] = [
  {
    id: 'body',
    label: 'Кузов',
    selectedName: 'Крепление кузова',
    code: 'BD-MNT-01',
    group: 'Кузов · крепления',
    details: [['Тип', 'стойки с клипсами'], ['Шаг отверстий', '5 мм'], ['Высота', '76 мм'], ['Резьба', 'M3'], ['Материал', 'композит'], ['Вес комплекта', '18 г']],
    filters: [{ label: 'Высота', value: '60–90 мм' }, { label: 'Резьба', value: 'M3' }, { label: 'Материал', value: 'Все' }],
    options: [
      { id: 'body-stock', code: 'BD-MNT-01', name: 'Стойки кузова STD', summary: '76 мм · композит', status: 'compatible', price: 790, specs: { Высота: '76 мм', Резьба: 'M3' }, delta: {} },
      { id: 'body-low', code: 'BD-MNT-02', name: 'Низкие стойки', summary: '64 мм · алюминий', status: 'compatible', price: 1290, specs: { Высота: '64 мм', Резьба: 'M3' }, delta: { mass: 8 } },
      { id: 'body-mag', code: 'BD-MAG-04', name: 'Магнитное крепление', summary: 'регулируемое', status: 'adapter', price: 1590, specs: { Высота: '55–82 мм', Резьба: 'M3' }, delta: { mass: 22 } },
    ],
  },
  {
    id: 'chassis',
    label: 'Шасси',
    selectedName: 'Передняя поперечина',
    code: 'CH-XM-01',
    group: 'Шасси · рама',
    details: [['Тип', 'передняя'], ['Ширина', '72 мм'], ['Крепления', '4 × M3'], ['Материал', 'сталь'], ['Толщина', '2 мм'], ['Вес', '46 г']],
    filters: [{ label: 'Ширина', value: '70–74 мм' }, { label: 'Материал', value: 'Все' }, { label: 'Крепление', value: 'M3' }],
    options: [
      { id: 'cross-stock', code: 'CH-XM-01', name: 'Поперечина STD', summary: 'сталь · 72 мм', status: 'compatible', price: 980, specs: { Ширина: '72 мм', Материал: 'Сталь' }, delta: {} },
      { id: 'cross-alloy', code: 'CH-XM-02', name: 'Поперечина Alloy', summary: 'алюминий · 72 мм', status: 'compatible', price: 1480, specs: { Ширина: '72 мм', Материал: 'Алюминий' }, delta: { mass: -18 } },
      { id: 'cross-servo', code: 'CH-XM-07', name: 'Площадка с выносом серво', summary: 'алюминий · усиленная', status: 'adapter', price: 2190, specs: { Ширина: '74 мм', Материал: 'Алюминий' }, delta: { mass: 12 } },
    ],
  },
  {
    id: 'suspension',
    label: 'Подвеска',
    selectedName: 'Передний амортизатор',
    code: 'P-FA-001',
    group: 'Подвеска · амортизаторы',
    details: [['Состояние', 'установлен'], ['Тип', 'масляный'], ['Длина', '90–110 мм'], ['Ход штока', '22 мм'], ['Крепление', 'шарнир M3'], ['Вес', '28 г']],
    filters: [{ label: 'Длина', value: '90–110 мм' }, { label: 'Жёсткость', value: 'Все' }, { label: 'Крепление', value: 'M3' }],
    options: [
      { id: 'shock-std', code: 'P-FA-001', name: 'Амортизатор STD', summary: '90–110 мм · средний', status: 'compatible', price: 1190, specs: { Длина: '90–110 мм', Жёсткость: 'Средняя' }, delta: {} },
      { id: 'shock-soft', code: 'P-FA-002', name: 'Амортизатор Soft', summary: '90–110 мм · мягкий', status: 'compatible', price: 1590, specs: { Длина: '90–110 мм', Жёсткость: 'Мягкая' }, delta: { clearance: 4, travel: 6, mass: 8 } },
      { id: 'shock-hard', code: 'P-FA-003', name: 'Амортизатор Hard', summary: '90–110 мм · жёсткий', status: 'compatible', price: 1690, specs: { Длина: '90–110 мм', Жёсткость: 'Жёсткая' }, delta: { clearance: 2, travel: 3, mass: 10 } },
      { id: 'shock-piggy', code: 'P-FA-005', name: 'Piggyback Sport', summary: '100–120 мм · резервуар', status: 'adapter', price: 2490, specs: { Длина: '100–120 мм', Жёсткость: 'Средняя' }, delta: { clearance: 9, travel: 10, mass: 26 } },
    ],
  },
  {
    id: 'transmission',
    label: 'Трансмиссия',
    selectedName: 'Раздаточная коробка',
    code: 'TR-TC-02',
    group: 'Трансмиссия · раздатка',
    details: [['Передаточное число', '1:1'], ['Входной вал', '3,17 мм'], ['Выходы', '2 × 3 мм'], ['Модуль', '0,5'], ['Корпус', 'алюминий'], ['Вес', '86 г']],
    filters: [{ label: 'Передаточное число', value: 'Все' }, { label: 'Входной вал', value: '3,17 мм' }, { label: 'Корпус', value: 'Все' }],
    options: [
      { id: 'transfer-stock', code: 'TR-TC-02', name: 'Раздатка 1:1', summary: 'алюминий · прямой привод', status: 'compatible', price: 2290, specs: { Передача: '1:1', Вал: '3,17 мм' }, delta: {} },
      { id: 'transfer-low', code: 'TR-TC-04', name: 'Раздатка Low 1.5:1', summary: 'понижающая · сталь', status: 'compatible', price: 3190, specs: { Передача: '1.5:1', Вал: '3,17 мм' }, delta: { speed: -1.8, mass: 14 } },
      { id: 'transfer-dual', code: 'TR-TC-07', name: 'Двухскоростная раздатка', summary: '1:1 / 2.2:1', status: 'modification', price: 4790, specs: { Передача: '2 режима', Вал: '3,17 мм' }, delta: { speed: 1.1, mass: 48 } },
    ],
  },
  {
    id: 'electronics',
    label: 'Электроника',
    selectedName: 'Регулятор оборотов',
    code: 'EL-ESC-40',
    group: 'Электроника · ESC',
    details: [['Тип мотора', 'коллекторный'], ['Постоянный ток', '40 A'], ['Пиковый ток', '180 A'], ['Питание', '2–3S'], ['BEC', '6 В / 3 А'], ['Защита', 'IP67']],
    filters: [{ label: 'Тип мотора', value: 'Все' }, { label: 'Ток', value: '40–80 A' }, { label: 'Питание', value: '2–3S' }],
    options: [
      { id: 'esc-stock', code: 'EL-ESC-40', name: 'ESC 40A WP', summary: 'brushed · 2–3S', status: 'compatible', price: 1890, specs: { Ток: '40 A', Питание: '2–3S' }, delta: {} },
      { id: 'esc-60', code: 'EL-ESC-60', name: 'ESC 60A Crawler', summary: 'brushed · drag brake', status: 'compatible', price: 2790, specs: { Ток: '60 A', Питание: '2–3S' }, delta: { mass: 12 } },
      { id: 'esc-brushless', code: 'EL-ESC-BL', name: 'ESC Brushless 80A', summary: 'sensored · 2–3S', status: 'adapter', price: 5690, specs: { Ток: '80 A', Питание: '2–3S' }, delta: { speed: 3.4, mass: 18 } },
    ],
  },
  {
    id: 'wheels',
    label: 'Колёса',
    selectedName: 'Переднее левое колесо',
    code: 'WH-108-A',
    group: 'Колёса · комплект',
    details: [['Диаметр', '108 мм'], ['Ширина', '38 мм'], ['Хекс', '7 мм'], ['Компаунд', 'мягкий'], ['Диск', 'beadlock 1.0″'], ['Вес', '92 г']],
    filters: [{ label: 'Диаметр', value: '100–115 мм' }, { label: 'Хекс', value: '7 мм' }, { label: 'Протектор', value: 'Все' }],
    options: [
      { id: 'wheel-stock', code: 'WH-108-A', name: 'Crawler 108', summary: '108 × 38 мм · soft', status: 'compatible', price: 2390, specs: { Диаметр: '108 мм', Хекс: '7 мм' }, delta: {} },
      { id: 'wheel-mud', code: 'WH-112-M', name: 'Mud Terrain 112', summary: '112 × 40 мм · super soft', status: 'compatible', price: 3190, specs: { Диаметр: '112 мм', Хекс: '7 мм' }, delta: { clearance: 2, mass: 44, speed: 0.3 } },
      { id: 'wheel-rock', code: 'WH-118-R', name: 'Rock 118', summary: '118 × 42 мм · sticky', status: 'modification', price: 3890, specs: { Диаметр: '118 мм', Хекс: '7 мм' }, delta: { clearance: 5, mass: 76, speed: 0.7 } },
    ],
  },
]
