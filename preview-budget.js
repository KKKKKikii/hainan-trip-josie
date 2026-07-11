const storageKey = 'hainan-trip-budget-v2'
const targetBudget = 14000

const defaultGroups = [
  {
    id: 'car',
    name: '租车',
    plan: 950,
    locked: true,
    entries: [{ amount: 950, note: '租车费用已确定' }]
  },
  {
    id: 'car-extra',
    name: '电费 / 停车 / 高速',
    plan: 600,
    entries: []
  },
  {
    id: 'stay',
    name: '住宿',
    plan: 2748,
    locked: true,
    entries: [
      { amount: 1748, note: '三亚山海梧桐民宿' },
      { amount: 1000, note: '万宁东澳镇海公馆6号楼民宿' }
    ]
  },
  {
    id: 'fishing',
    name: '海钓',
    plan: 1200,
    entries: []
  },
  {
    id: 'surfing',
    name: '冲浪',
    plan: 1000,
    entries: []
  },
  {
    id: 'water',
    name: '现场水上项目',
    plan: 1500,
    entries: []
  },
  {
    id: 'food',
    name: '餐饮',
    plan: 4500,
    entries: []
  },
  {
    id: 'flex',
    name: '机动预算',
    plan: 1502,
    entries: []
  }
]

let groups = loadGroups()

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultGroups))
}

function loadGroups() {
  try {
    const saved = localStorage.getItem(storageKey)
    return normalizeGroups(saved ? JSON.parse(saved) : cloneDefaults())
  } catch (error) {
    return normalizeGroups(cloneDefaults())
  }
}

function normalizeGroups(source) {
  const normalized = source.filter(group => group.name !== '免税购物')
  if (!normalized.some(group => group.id === 'flex')) {
    const currentPlan = normalized.reduce((sum, group) => sum + Number(group.plan || 0), 0)
    normalized.push({
      id: 'flex',
      name: '机动预算',
      plan: Math.max(targetBudget - currentPlan, 0),
      entries: []
    })
  }
  return normalized
}

function saveGroups() {
  localStorage.setItem(storageKey, JSON.stringify(groups))
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString()}`
}

function groupSpent(group) {
  return group.entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
}

function renderCategoryOptions() {
  const select = document.querySelector('#entryCategory')
  select.innerHTML = groups.map(group => `<option value="${group.id}">${group.name}</option>`).join('')
}

function render() {
  saveGroups()
  const planned = groups.reduce((sum, group) => sum + Number(group.plan || 0), 0)
  const spent = groups.reduce((sum, group) => sum + groupSpent(group), 0)
  const confirmed = groups
    .filter(group => group.locked)
    .reduce((sum, group) => sum + groupSpent(group), 0)
  const entryCount = groups.reduce((sum, group) => sum + group.entries.length, 0)

  document.querySelector('#budgetTotal').textContent = `${money(spent)} / ${money(planned)}`
  document.querySelector('#budgetHint').textContent = spent > planned
    ? `已经超出 ${money(spent - planned)}，后面要收一收。`
    : `还剩 ${money(planned - spent)}，已确定 ${money(confirmed)}。`
  document.querySelector('#groupCount').textContent = groups.length.toString().padStart(2, '0')
  document.querySelector('#entryCount').textContent = entryCount.toString().padStart(2, '0')
  document.querySelector('#confirmedTotal').textContent = money(confirmed)

  document.querySelector('#budgetList').innerHTML = groups.map((group, index) => {
    const spentInGroup = groupSpent(group)
    const left = Number(group.plan || 0) - spentInGroup
    return `
      <article class="budget-row ${group.locked ? 'confirmed' : ''}">
        <div class="receipt-line">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h2>${group.name}</h2>
          <b>${money(spentInGroup)}</b>
        </div>
        <div class="budget-subline">
          <span>预算 ${money(group.plan)}</span>
          <span>${left >= 0 ? `剩余 ${money(left)}` : `超出 ${money(Math.abs(left))}`}</span>
        </div>
        <div class="entry-list">
          ${group.entries.length ? group.entries.map((entry, entryIndex) => `
            <div class="entry-item">
              <p>${entry.note || '未备注'}</p>
              <strong>${money(entry.amount)}</strong>
              <button type="button" data-action="delete-entry" data-group="${group.id}" data-entry="${entryIndex}" aria-label="删除">×</button>
            </div>
          `).join('') : '<p class="empty-entry">还没记账</p>'}
        </div>
        ${group.locked ? '' : `<button class="delete-group" type="button" data-action="delete-group" data-group="${group.id}">删除这个大类</button>`}
      </article>
    `
  }).join('')

  document.querySelectorAll('[data-action="delete-entry"]').forEach(button => {
    button.addEventListener('click', () => {
      const group = groups.find(item => item.id === button.dataset.group)
      group.entries.splice(Number(button.dataset.entry), 1)
      render()
    })
  })

  document.querySelectorAll('[data-action="delete-group"]').forEach(button => {
    button.addEventListener('click', () => {
      const group = groups.find(item => item.id === button.dataset.group)
      if (!group || !confirm(`删除「${group.name}」这个大类和里面的记录吗？`)) return
      groups = groups.filter(item => item.id !== button.dataset.group)
      renderCategoryOptions()
      render()
    })
  })
}

document.querySelector('#addEntry').addEventListener('click', () => {
  const groupId = document.querySelector('#entryCategory').value
  const amount = Number(document.querySelector('#entryAmount').value || 0)
  const note = document.querySelector('#entryNote').value.trim()
  if (!amount) return

  const group = groups.find(item => item.id === groupId)
  group.entries.push({ amount, note })
  document.querySelector('#entryAmount').value = ''
  document.querySelector('#entryNote').value = ''
  render()
})

document.querySelector('#addGroup').addEventListener('click', () => {
  const name = document.querySelector('#groupName').value.trim()
  const plan = Number(document.querySelector('#groupPlan').value || 0)
  if (!name) return

  groups.push({
    id: `custom-${Date.now()}`,
    name,
    plan,
    entries: []
  })
  document.querySelector('#groupName').value = ''
  document.querySelector('#groupPlan').value = ''
  renderCategoryOptions()
  render()
})

renderCategoryOptions()
render()
