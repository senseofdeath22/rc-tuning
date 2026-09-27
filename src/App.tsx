import {
  ArrowCounterClockwise,
  ArrowRight,
  ArrowsClockwise,
  BatteryHigh,
  CaretDown,
  CheckCircle,
  CloudCheck,
  Cube,
  Eye,
  Gear,
  Hand,
  House,
  Lightning,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  Notebook,
  Package,
  ShoppingCartSimple,
  SlidersHorizontal,
  SquaresFour,
  WarningCircle,
  Wrench,
} from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { baseMetrics, subsystems } from './data'
import { VehicleScene } from './components/VehicleScene'
import type { PartOption, SubsystemId } from './types'

const navigation = [
  { label: 'Проект', icon: House, active: true },
  { label: '3D', icon: Cube },
  { label: 'Каталог', icon: SquaresFour },
  { label: 'Заметки', icon: Notebook },
  { label: 'Диагностика', icon: SlidersHorizontal },
]

const subsystemIcons = {
  body: Package,
  chassis: Cube,
  suspension: SlidersHorizontal,
  transmission: ArrowsClockwise,
  electronics: BatteryHigh,
  wheels: Gear,
}

const dependencyCopy: Record<SubsystemId, [string, string, string]> = {
  body: ['Крепление кузова', 'Высота стоек', 'Зазоры кузова'],
  chassis: ['Поперечина', 'Крепление серво', 'Геометрия тяг'],
  suspension: ['Амортизатор', 'Крепление', 'Пружина'],
  transmission: ['Раздатка', 'Карданные валы', 'Передаточное число'],
  electronics: ['Регулятор', 'Разъёмы', 'Аккумулятор'],
  wheels: ['Колесо', 'Ступичный хекс', 'Зазор кузова'],
}

function formatDelta(value: number, unit: string) {
  if (value === 0) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${Number.isInteger(value) ? value : value.toFixed(1)} ${unit}`
}

function PartGlyph({ active = false }: { active?: boolean }) {
  return (
    <div className={`part-glyph ${active ? 'part-glyph--active' : ''}`} aria-hidden="true">
      <span className="part-glyph__eye part-glyph__eye--top" />
      <span className="part-glyph__body" />
      <span className="part-glyph__spring" />
      <span className="part-glyph__eye part-glyph__eye--bottom" />
    </div>
  )
}

function StatusLabel({ status }: { status: PartOption['status'] }) {
  if (status === 'compatible') {
    return <span className="status status--ok"><CheckCircle weight="fill" /> Совместимо</span>
  }
  if (status === 'adapter') {
    return <span className="status status--warn"><WarningCircle weight="fill" /> Нужен адаптер</span>
  }
  return <span className="status status--danger"><WarningCircle weight="fill" /> Нужна доработка</span>
}

function App() {
  const [selectedId, setSelectedId] = useState<SubsystemId>('suspension')
  const [viewMode, setViewMode] = useState<'outside' | 'internals'>('outside')
  const [removed, setRemoved] = useState(false)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState<string | null>(null)

  const subsystem = subsystems.find((item) => item.id === selectedId) ?? subsystems[2]
  const preview = subsystem.options.find((item) => item.id === previewId) ?? null
  const currentOption = subsystem.options[0]

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru')
    if (!normalized) return subsystem.options
    return subsystem.options.filter((option) => `${option.name} ${option.code} ${option.summary}`.toLocaleLowerCase('ru').includes(normalized))
  }, [query, subsystem])

  const metrics = {
    clearance: baseMetrics.clearance + (preview?.delta.clearance ?? 0),
    travel: baseMetrics.travel + (preview?.delta.travel ?? 0),
    mass: baseMetrics.mass + (preview?.delta.mass ?? 0),
    speed: baseMetrics.speed + (preview?.delta.speed ?? 0),
  }

  const chooseSubsystem = (id: SubsystemId) => {
    setSelectedId(id)
    setPreviewId(null)
    setRemoved(false)
    setQuery('')
  }

  const toggleRemoved = () => {
    setRemoved((value) => !value)
    setPreviewId(null)
  }

  const handlePreview = (option: PartOption) => {
    setPreviewId(option.id)
    setRemoved(false)
    setNotice(`${option.name} установлена в режиме примерки`)
    window.setTimeout(() => setNotice(null), 2600)
  }

  const handleShop = (option: PartOption) => {
    setNotice(`Поиск продавцов для ${option.code} — демонстрационный режим`)
    window.setTimeout(() => setNotice(null), 3200)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="wordmark" aria-label="RC Workshop">
          <strong>RC</strong><span>WORKSHOP</span>
        </div>
        <div className="project-title">
          <span>MN 128</span>
          <i aria-hidden="true" />
          <button type="button">Горный маршрут <CaretDown size={14} /></button>
        </div>
        <div className="save-state"><CloudCheck size={17} /> Сохранено 12:48</div>
        <button className="icon-button" type="button" aria-label="Настройки"><Gear size={20} /></button>
      </header>

      <aside className="toolrail" aria-label="Основная навигация">
        <nav>
          {navigation.map(({ label, icon: Icon, active }) => (
            <button key={label} className={active ? 'is-active' : ''} type="button">
              <Icon size={23} weight={active ? 'fill' : 'regular'} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button className="toolrail__settings" type="button"><Gear size={23} /><span>Настройки</span></button>
      </aside>

      <main className="workspace">
        <section className="model-area" aria-label="Рабочая область цифрового двойника">
          <div className="subsystem-tabs" role="tablist" aria-label="Системы автомобиля">
            {subsystems.map((item) => {
              const Icon = subsystemIcons[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedId === item.id}
                  className={selectedId === item.id ? 'is-active' : ''}
                  onClick={() => chooseSubsystem(item.id)}
                >
                  <Icon size={27} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="viewport">
            <VehicleScene
              selected={selectedId}
              bodyVisible={viewMode === 'outside'}
              partRemoved={removed}
              onSelect={chooseSubsystem}
            />
            <div className="selection-label" aria-live="polite">
              <span />
              {removed ? `${subsystem.selectedName} снят` : subsystem.selectedName}
            </div>
            <div className="viewport-controls">
              <div className="view-switch" aria-label="Режим отображения">
                <button type="button" className={viewMode === 'outside' ? 'is-active' : ''} onClick={() => setViewMode('outside')}>Снаружи</button>
                <button type="button" className={viewMode === 'internals' ? 'is-active' : ''} onClick={() => setViewMode('internals')}>Внутренности</button>
              </div>
              <button type="button" onClick={() => setViewMode(viewMode === 'outside' ? 'internals' : 'outside')}>
                {viewMode === 'outside' ? <Eye size={17} /> : <Eye size={17} />}
                {viewMode === 'outside' ? 'Скрыть кузов' : 'Показать кузов'}
              </button>
              <span className="controls-spacer" />
              <button type="button"><Hand size={17} /> Вращать</button>
              <button type="button"><MagnifyingGlassPlus size={17} /> Масштаб</button>
              <button type="button"><ArrowCounterClockwise size={17} /> Сбросить вид</button>
            </div>
          </div>

          <section className="dependency-panel" aria-labelledby="dependency-title">
            <div className="dependency-heading">
              <h2 id="dependency-title">Изменения сборки</h2>
              <p>Цепочка зависимостей при замене детали</p>
            </div>
            <ol className="dependency-flow">
              {dependencyCopy[selectedId].map((label, index) => (
                <li key={label} className={index === 0 ? 'is-active' : ''}>
                  <span className="dependency-step">{index + 1}</span>
                  {index === 0 ? <Wrench size={24} /> : index === 1 ? <Cube size={24} /> : <Gear size={24} />}
                  <div><strong>{label}</strong><small>{index === 0 ? 'Выбранная деталь' : 'Проверить совместимость'}</small></div>
                  {index < 2 && <ArrowRight className="dependency-arrow" size={22} />}
                </li>
              ))}
            </ol>
          </section>
        </section>

        <aside className="inspector" aria-label="Инспектор детали и каталог">
          <section className="part-header">
            <div className="part-heading-row">
              <div><p>{subsystem.group}</p><h1>{subsystem.selectedName}</h1></div>
              <span>{subsystem.code}</span>
            </div>
            <div className="part-overview">
              <div className="part-preview"><PartGlyph active /><span className="measure-line measure-line--vertical">90–110</span></div>
              <dl>
                {subsystem.details.map(([term, value]) => (
                  <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
            <div className="part-actions">
              <button type="button" className="button button--primary" onClick={toggleRemoved}>
                <Wrench size={18} weight="bold" /> {removed ? 'Вернуть деталь' : 'Снять деталь'}
              </button>
              <button type="button" className="button"><MagnifyingGlass size={18} /> Найти замену</button>
            </div>
          </section>

          <section className="metric-impact" aria-labelledby="impact-title">
            <div className="section-heading"><h2 id="impact-title">Влияние на характеристики</h2><span>оценочно</span></div>
            <table>
              <thead><tr><th>Параметр</th><th>До</th><th>После</th><th>Δ</th></tr></thead>
              <tbody>
                <tr><td>Клиренс</td><td>{baseMetrics.clearance} мм</td><td>{metrics.clearance} мм</td><td>{formatDelta(metrics.clearance - baseMetrics.clearance, 'мм')}</td></tr>
                <tr><td>Ход подвески</td><td>{baseMetrics.travel} мм</td><td>{metrics.travel} мм</td><td>{formatDelta(metrics.travel - baseMetrics.travel, 'мм')}</td></tr>
                <tr><td>Масса</td><td>{baseMetrics.mass} г</td><td>{metrics.mass} г</td><td>{formatDelta(metrics.mass - baseMetrics.mass, 'г')}</td></tr>
                <tr><td>Скорость</td><td>{baseMetrics.speed.toFixed(1)}</td><td>{metrics.speed.toFixed(1)}</td><td>{formatDelta(metrics.speed - baseMetrics.speed, 'км/ч')}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="catalog" aria-labelledby="catalog-title">
            <div className="section-heading catalog__heading"><h2 id="catalog-title">Совместимые варианты</h2><span>{filteredOptions.length}</span></div>
            <div className="catalog-search">
              <MagnifyingGlass size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Артикул или название" aria-label="Поиск по каталогу" />
            </div>
            <div className="filters">
              {subsystem.filters.map((filter) => (
                <label key={filter.label}><span>{filter.label}</span><button type="button">{filter.value}<CaretDown size={12} /></button></label>
              ))}
            </div>
            <div className="catalog-list">
              {filteredOptions.length === 0 ? (
                <div className="empty-state"><MagnifyingGlass size={30} /><strong>Ничего не найдено</strong><span>Измените запрос или сбросьте фильтры.</span></div>
              ) : filteredOptions.map((option) => {
                const active = preview?.id === option.id
                return (
                  <article key={option.id} className={`catalog-row ${active ? 'is-previewing' : ''}`}>
                    <PartGlyph active={active} />
                    <div className="catalog-row__main">
                      <div className="catalog-row__title"><strong>{option.name}</strong><small>{option.code}</small></div>
                      <span>{option.summary}</span>
                      <StatusLabel status={option.status} />
                    </div>
                    <div className="catalog-row__price"><strong>{option.price.toLocaleString('ru-RU')} ₽</strong><small>цена-пример</small></div>
                    <div className="catalog-row__actions">
                      <button type="button" className={active ? 'button button--active' : 'button'} onClick={() => handlePreview(option)}>{active ? 'Примеряется' : 'Примерить'}</button>
                      <button type="button" className="buy-button" onClick={() => handleShop(option)} aria-label={`Найти место покупки: ${option.name}`}><ShoppingCartSimple size={18} /></button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
          <p className="data-note">Данные, совместимость и цены демонстрационные</p>
        </aside>
      </main>

      {notice && <div className="toast" role="status"><CheckCircle size={19} weight="fill" /> {notice}</div>}
    </div>
  )
}

export default App
