import AV from 'leancloud-storage'
import Skill from './Skill'
import NP from './NP'

export default class Servant extends AV.Object {
  constructor() {
    super()
    this.set('id', '')
    this.set('name', '')
    this.set('nameJP', '')
    this.set('nameEN', '')
    this.set('fuzzyKeywords', [])
    this.set('exactKeywords', [''])
    this.set('rarity', -1)
    this.set('class', -1)
    this.set('startATK', 0)
    this.set('endATK', 0)
    this.set('startHP', 0)
    this.set('endHP', 0)
    this.set('grailATK', 0)
    this.set('grailHP', 0)
    this.set('illustrator', '')
    this.set('cv', '')
    this.set('gender', '')
    this.set('attribute', -1)
    /****
    * 属性
    * 0: 人
    * 1: 天
    * 2: 地
    * 3: 星
    * 4: 兽
    ****/

    this.set('alignment', '',)
    this.set('cards', [0, 0, 0])
    this.set('hits', [0, 0, 0, 0])
    this.set('charge', [0, 0, 0, 0])
    this.set('starAbsorption', -1)
    this.set('starGeneration', -1)
    this.set('npChargeATK', -1)
    this.set('npChargeDEF', -1)
    this.set('deathResist', 0)
    this.set('traits', [])

    this.set('skill1', [])
    this.set('skill2', [])
    this.set('skill3', [])
    this.set('NP', [])
  }
}

AV.Object.register(Servant)

export const basicList = [
  'id',
  'name',
  'nameJP',
  'nameEN',
  // 'fuzzyKeywords',
  // 'exactKeywords',
  'rarity',
  'class',
  'startATK',
  'endATK',
  'startHP',
  'endHP',
  'grailATK',
  'grailHP',
  'illustrator',
  'cv',
  'gender',
  'attribute',
  'alignment',
  'cards',
  'hits',
  'charge',
  'starAbsorption',
  'starGeneration',
  'npChargeATK',
  'npChargeDEF',
  // 'traits',
]

export const EN2CN = {
  'id': 'id',
  'name': 'name',
  'nameJP': 'nameJP',
  'nameEN': 'nameEN',
  // 'fuzzyKeywords': 'fuzzyKeywords',
  // 'exactKeywords': 'exactKeywords',
  'rarity': 'rarity',
  'class': 'class',
  'startATK': '初始 ATK',
  'endATK': '满级 ATK',
  'startHP': '初始 HP',
  'endHP': '满级 HP',
  'grailATK': '圣杯满级 ATK',
  'grailHP': '圣杯满级 HP',
  'illustrator': '画师',
  'cv': 'cv',
  'gender': '性别',
  'attribute': 'attribute',
  'alignment': 'alignment',
  'cards': '卡数',
  'hits': 'hits',
  'charge': '卡 NP 率',
  'starAbsorption': '暴击权重',
  'starGeneration': '产星率',
  'npChargeATK': '宝具 NP 率',
  'npChargeDEF': '受击 NP 率',
}

export const classConvert = {
  "Shielder": 0,
  "Saber": 1,
  "Archer": 2,
  "Lancer": 3,
  "Rider": 4,
  "Caster": 5,
  "Assassin": 6,
  "Berserker": 7,
  "Ruler": 8,
  "Avenger": 9,
  "Alterego": 10,
  "Moon Cancer": 11,
  "BeastI": 12,
  "BeastⅡ": 13,
  "BeastⅢ": 14,
  "Grand Caster": 15
}

export const genderConvert = {
  "？": -1,
  "女": 1,
  "男": 0,
  "依据个体而不同": 2,
  "－": 3,
  "无": 4,
  "男・女": 5,
  "？？？": -1
}

export const attributeConvert = {
  "人": 0,
  "天": 1,
  "地": 2,
  "星": 3,
  "兽": 4
}

export const alignmentConvert = {
  "秩序・善": '00',
  "中立・中庸": '11',
  "混沌・善": '20',
  "中立・恶": '12',
  "秩序・中庸": '01',
  "中立・善": '10',
  "混沌・中庸": '21',
  "混沌・恶": '22',
  "秩序・恶": '02',
  "中立・夏": '15',
  "混沌·善": '20',
  "混沌·恶": '22',
  "秩序・善　": '00',
  "混沌・中立": '21',
  "中庸・善": '10',
  "混沌・狂": '23',
  "秩序・狂": '03',
  "秩序・中立": '01',
  "秩序・善&混沌・恶": '00,22',
  "秩序・善 ": '00',
  "混沌・花嫁": '24'
}

export const shouldBeInteger = {
  'rarity': true,
  'class': true,
  'startATK': true,
  'endATK': true,
  'startHP': true,
  'endHP': true,
  'grailATK': true,
  'grailHP': true,
  'gender': true,
  'attribute': true,
  'cards': true,
  'hits': true,
  'starAbsorption': true,
}

export const shouldBeFloat = {
  'charge': true,
  'starGeneration': true,
  'npChargeATK': true,
  'npChargeDEF': true,
}
