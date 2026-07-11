const itinerary = [
  {
    date: '7月12日',
    city: '三亚',
    title: '抵达三亚',
    icon: '✈',
    photo: 'sanya',
    hotel: '山海梧桐民宿',
    address: '三亚，具体门牌以订单页为准',
    drive: '凤凰机场取车后到民宿，约35-55分钟',
    summary: '落地、取车、入住，不安排硬项目',
    plans: [['晚上', '抵达三亚凤凰机场'], ['晚上', '取车后去山海梧桐民宿办理入住']]
  },
  {
    date: '7月13日',
    city: '三亚',
    title: '三亚轻项目窗口',
    icon: '〰',
    photo: 'sanya',
    hotel: '山海梧桐民宿',
    address: '三亚，具体门牌以订单页为准',
    drive: '民宿到大东海/市区海边约15-35分钟，市区内看堵车',
    summary: '把天气较好的窗口留给海边和轻项目',
    plans: [['上午', '三亚水上/海边轻项目，看当天海况决定'], ['下午', '大东海/三亚湾轻松逛吃或回民宿休息']]
  },
  {
    date: '7月14日',
    city: '三亚',
    title: '三亚弹性日',
    icon: '☁',
    photo: 'sanya',
    hotel: '山海梧桐民宿',
    address: '三亚，具体门牌以订单页为准',
    drive: '市区活动多在20-45分钟内，雨天少折腾',
    summary: '适合补项目、咖啡、商场或泳池',
    plans: [['上午', '看天气补三亚轻项目'], ['下午', '商场/咖啡/酒店休息，保留雨天备选']]
  },
  {
    date: '7月15日',
    city: '三亚 → 万宁',
    title: '换到万宁',
    icon: '🚗',
    photo: 'wanning',
    hotel: '万宁东澳镇海公馆6号楼民宿',
    address: '万宁东澳镇海公馆6号楼，具体房号以订单页为准',
    drive: '三亚民宿开到万宁民宿约2小时10分-2小时50分',
    summary: '退房后开去万宁，路上不赶',
    plans: [['上午', '三亚退房，慢慢收拾行李'], ['中午/下午', '自驾去万宁东澳镇海公馆6号楼民宿']]
  },
  {
    date: '7月16日',
    city: '万宁',
    title: '万宁适应日',
    icon: '☀',
    photo: 'wanning',
    hotel: '万宁东澳镇海公馆6号楼民宿',
    address: '万宁东澳镇海公馆6号楼，具体房号以订单页为准',
    drive: '民宿到神州半岛/石梅湾约25-45分钟，到日月湾约45-70分钟',
    summary: '熟悉周边，确认海钓和冲浪预约',
    plans: [['上午', '睡醒后看海/附近吃饭'], ['下午', '确认海钓集合点、冲浪时间和天气改期规则']]
  },
  {
    date: '7月17日',
    city: '万宁',
    title: '认真海钓',
    icon: '🎣',
    photo: 'wanning',
    hotel: '万宁东澳镇海公馆6号楼民宿',
    address: '万宁东澳镇海公馆6号楼，具体房号以订单页为准',
    drive: '到海钓集合点约25-50分钟，按商家码头位置微调',
    summary: '核心项目日，尽量放上午或中午前后',
    plans: [['上午/中午', '半天认真海钓，提前问清船型、保险和鱼获处理'], ['下午', '回民宿洗澡休息，晚上轻松吃饭']]
  },
  {
    date: '7月18日',
    city: '万宁',
    title: '冲浪日',
    icon: '🏄',
    photo: 'wanning',
    hotel: '万宁东澳镇海公馆6号楼民宿',
    address: '万宁东澳镇海公馆6号楼，具体房号以订单页为准',
    drive: '到日月湾约45-70分钟，建议预留停车和换衣时间',
    summary: '上午冲浪，下午留给休息或附近海边',
    plans: [['上午', '日月湾冲浪课'], ['下午', '回民宿休息或附近海边散步']]
  },
  {
    date: '7月19日',
    city: '万宁 → 三亚 → 北京',
    title: '免税店 + 晚上返程',
    icon: '✦',
    photo: 'sanya',
    hotel: '返程日',
    address: '晚上从三亚凤凰机场飞北京',
    drive: '万宁民宿到三亚国际免税城约1小时40分-2小时20分；免税城到凤凰机场约45-70分钟',
    summary: '白天回三亚，晚上还车飞北京',
    plans: [['上午', '从万宁出发回三亚'], ['中午/下午', '三亚国际免税城，注意离岛信息和提货时间'], ['晚上', '去机场还车，飞北京']]
  }
]

const activities = [
  ['认真海钓', '7月17日上午', '万宁神州半岛/石梅湾周边'],
  ['日月湾冲浪课', '7月18日上午', '万宁日月湾'],
  ['三亚国际免税城', '7月19日白天', '三亚海棠湾']
]

const budget = [
  ['租车', 950],
  ['车杂费', 600],
  ['住宿', 2748],
  ['海钓', 1200],
  ['冲浪', 1000],
  ['现场水上项目', 1500],
  ['餐饮', 4500]
]

function renderTimeline() {
  document.querySelector('#timeline').innerHTML = itinerary.map((day, index) => `
    <article class="timeline-card ${index === 0 ? 'open' : ''}">
      <div class="timeline-pin">
        <div class="pin-dot"></div>
        <div class="pin-line"></div>
      </div>
      <div class="timeline-content">
        <span class="city-label">${day.city}</span>
        <div class="timeline-trigger">
          <span>第${index + 1}天</span>
          <span>${day.date.replace('月', '.').replace('日', '')}</span>
          <i>${day.icon}</i>
        </div>
        <div class="timeline-detail">
          <span class="timeline-title">${day.title}</span>
          <div class="hotel-card hotel-${day.photo}">
            <span>住 / 行程点</span>
            <strong>${day.hotel}</strong>
          </div>
          <span class="timeline-drive">开车：${day.drive}</span>
          <span class="timeline-summary">${day.summary}</span>
          <div class="plan-list">
            ${day.plans.map(plan => `<p><b>${plan[0]}</b>${plan[1]}</p>`).join('')}
          </div>
        </div>
      </div>
    </article>
  `).join('')

  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open')
    })
  })
}

renderTimeline()
