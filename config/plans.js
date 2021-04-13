const currency = '$';

const plans = [
  {
    id: 'free_plan',
    private_credits: '10000',
    public_credits: 0,
    users: 0,
    price: 0,
    name: 'Free',
    currency,
    is_enabled: true,
    is_default: false,
    is_annual: false,
  },
  {
    id: 'one_concurrent',
    private_credits: 0,
    public_credits: 0,
    users: 0,
    price: 6900,
    price_annual: 75900,
    name: '1 concurrent job',
    currency,
    is_enabled: true,
    is_default: false,
    is_annual: false,
  },
  {
    id: 'two_concurrent',
    private_credits: 0,
    public_credits: 0,
    users: 0,
    price: 12900,
    price_annual: 141900,
    name: '2 concurrent jobs',
    currency,
    is_enabled: true,
    is_default: false,
    is_annual: false,
  },
  {
    id: 'five_concurrent',
    private_credits: 0,
    public_credits: 0,
    users: 0,
    price: 24900,
    price_annual: 273900,
    name: '5 concurrent jobs',
    currency,
    is_enabled: true,
    is_default: false,
    is_annual: false,
  },
  {
    id: 'five_concurrent_annual',
    private_credits: 0,
    public_credits: 0,
    users: 0,
    price: 0,
    name: 'Custom',
    currency,
    is_enabled: true,
    is_default: false,
    is_annual: false,
  },
];

module.exports = { plans };
