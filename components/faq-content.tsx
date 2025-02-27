"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"
import { FAQSchema } from "@/app/buying-guide/faq/schema"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Can any foreigner buy a property in Turkey?",
    answer:
      "Yes. Everyone from any country can buy estate or a house in Turkey except for Syria, North Korea, South Cyprus, Armenia, and Cuba.",
  },
  {
    question: "Is it easy to buy a property in Turkey?",
    answer:
      "Yes. Besides, buying real estate property in Turkey is relatively easier than it is in many countries of the world. Browse real estate for sale in Turkey.",
  },
  {
    question: "Is it true that the procedures for buying a property in Turkey take a lot of time?",
    answer:
      "No, the Turkish government has made the process easier for buyers in recent years. Therefore, buying a property in Turkey is much easier and faster compared to many countries.",
  },
  {
    question: "Is it true that the Turkish government retains my real estate ownership in the event of my death?",
    answer:
      "No, the real estate you buy in Turkey is freehold. This means that the right of ownership belongs to the person who buys the property. In the event of death, the owner's family has the right to inherit the property following the laws.",
  },
  {
    question: "Is it safe to do business with any real estate agency?",
    answer:
      "Turkey is an investor-friendly country and there are many laws to protect buyers' rights. There are many professional and reputable real estate consultancy firms in Turkey that contribute to the success of the sale. It is also best advised to choose a specialized and reputable real estate company to complete the process.",
  },
  {
    question: "Can I buy a house in Turkey without personally attending?",
    answer:
      "You can complete all legal procedures in Turkey through a power of attorney. Our TeleProperty service provides you with a seamless and transparent process of purchasing a property over the phone. You can join our virtual tours of the properties you are interested in and know all the details as if you are already with us.",
  },
  {
    question: "How is living and its costs in Turkey in general?",
    answer:
      "It is much cheaper compared to many European countries. Also, the results of a 2019 study announced by the Turkish Statistical Institute show that Turkey is the cheapest country in Europe. You can visit our pages about the cost of living in Turkey and why Turkey.",
  },
  {
    question: "What about religious and cultural freedom in Turkey?",
    answer:
      "Turkey is a country of different religions, cultures, and lifestyles where everyone coexists in peace and is protected by law. The diverse societal mix will allow you to get used to the environment smoothly and live freely.",
  },
  {
    question: "Is it possible to study in Turkey in languages other than Turkish?",
    answer:
      "There are a lot of schools in Turkey where official language is English, Arabic, German, French, Italian, and more.",
  },
  {
    question: "What about real estate taxes in Turkey?",
    answer:
      "Taxes in Turkey are much lower than many countries of the world. The housing tax percentage is 0.002 in cities and 0.004 in the largest cities and commercial properties. You can contact us to learn more about other property-related taxes.",
  },
  {
    question: "Are the returns on real estate investment in Turkey rewarding?",
    answer:
      "One of the most compelling reasons to buy real estate in Turkey is the rate of return on your investment. Take a look at the real estate in Turkey so that you can get the maximum efficiency of your investment.",
  },
  {
    question: "What should I do to buy a property in Turkey?",
    answer:
      "If you want to buy a property in Turkey, you must first determine the location and type of property you want to buy. Learn about the area and the estates it offers. Then find a reputable agent who can guide and advise you during your property search and purchase.",
  },
  {
    question: "Are there additional costs when buying a property in Turkey?",
    answer:
      "Appraisal Report Fee, Title Deed Transfer Tax, and VAT are additional costs to be paid during purchase. Utility subscriptions and furniture costs are the costs you will pay after purchasing your property.",
  },
  {
    question: "Is buying a property in Turkey completely safe?",
    answer:
      "Yes. If you are buying a property through a professional real estate company, it is safe to buy a property in Turkey. And we should be careful of what is not.",
  },
  {
    question: "Is buying a property in Turkey a good investment?",
    answer:
      "Yes. Since real estate in Turkey is gaining good value annually, and real estate rental is making a good profit, buying a property in Turkey is a good investment.",
  },
  {
    question: "Can I come to Turkey in my car?",
    answer: "Yes. Your car can stay in Turkey for 24 months.",
  },
  {
    question: "Is a foreign driving license valid in Turkey?",
    answer:
      "Yes. You can use your driving license for six months in Turkey. You need to get a driving license from Turkey for a longer stay than that.",
  },
  {
    question: "What comes after the sales contract?",
    answer:
      "After completing the forms of both parties and entering the system with the receipt number given by the General Directorate of Land Registry, the process of transferring the title deed begins.",
  },
  {
    question: "How long does it take to transfer funds after the title deed transfer?",
    answer:
      "The sale amount is transferred to the seller's account immediately upon completion of the transfer process at the Tapu Office. But if the transaction is executed after 17:15, the amount is transferred to the seller's account on the next business day.",
  },
  {
    question: "What about transferring funds for proxy or proxy transactions?",
    answer:
      "For sales transactions with a power of attorney, the IBAN of the seller's bank account is required to be entered into the Tapu Transfer System. So that the amount of the sales is deposited in the seller's account only.",
  },
  {
    question: "Can I be sure the funds are guaranteed by Takasbank?",
    answer:
      "Parties are notified via SMS or email at every stage of the process. Additionally, you can track every stage of the process using the 'Check Order' button on www.takasbank.com.tr",
  },
  {
    question: "Is it possible to cancel the sale?",
    answer:
      "The buyer and seller can cancel the sale even if the money has been transferred as long as there is no match from TAKBIS (matching the amount entered into the system by both parties).",
  },
  {
    question: "Does Takasbank accept money transfers from all banks?",
    answer:
      "Yes. However, the payment should only be sent from the IBAN account number specified during the initial registration in the system.",
  },
  {
    question: "Should the sale price be the same as the sale amount on the title deed?",
    answer: "No, the preferred sale amount can be determined through this system.",
  },
  {
    question: "How is the process if there is more than one buyer or seller?",
    answer:
      "The system works the same way. All parties must register in the system separately and the sale amount they will enter into the system must be their own amount of ownership percentage.",
  },
  {
    question: "How can I check Takasbank messages?",
    answer:
      "All notification messages sent by Takasbank include an 'Order Verification Code' sent during the initial registration, and messages that do not contain an 'Order Verification Code' or do not contain the correct code, should not be considered.",
  },
  {
    question: "What is the title deed (Tapu)?",
    answer:
      "A title deed (TAPU) is a document that establishes and protects property rights. Displays the location, size, type, and name of the property owner.",
  },
  {
    question: "Do I have to make any payments to the bank when opening a bank account in Turkey?",
    answer: "No, there is no cost to open a bank account in Turkey.",
  },
  {
    question: "Does opening a bank account in Turkey take a lot of time?",
    answer:
      "Unlike most other countries, transactions are much easier and less complicated in Turkey. You can open a bank account within an hour when you arrive at the bank with ready-made documents.",
  },
  {
    question: "Is it possible to get real estate loans for foreigners from Turkish banks?",
    answer:
      "Yes, foreign property buyers can get real estate loans in Turkey. We have completed this process with 100% success for foreigners since we established our company.",
  },
  {
    question: "Is it useful to obtain a mortgage in Turkey?",
    answer:
      "It depends on the interest rates in the buyer's home country. If your home country provides mortgages with low interest rates, you can prefer to get a mortgage in your home country. You can also consider buying properties in installments from construction companies.",
  },
  {
    question: "Is it possible to get a mortgage in Turkey if I did not have a bank account in Turkey before?",
    answer: "Yes. Foreigners can use housing loans in Turkey. There is no obligation to have an account upfront.",
  },
  {
    question: "Is it possible to pay for the property by check?",
    answer:
      "In Turkey, checks are not accepted as a means of payment for real estate purchases. We accept cash, bank transfers, and Bitcoin only.",
  },
  {
    question: "Is it possible to get a tax number online in Turkey?",
    answer: "Yes. You can also get it from tax offices in every city and region in Turkey.",
  },
  {
    question: "What if my tax identification number is lost?",
    answer:
      "The tax number can be easily reported in Turkey. However, we advise you to keep a copy of it in a safe place to avoid unnecessary work.",
  },
  {
    question: "How valid is the tax ID number in Turkey?",
    answer:
      "Tax numbers do not have a verification period in Turkey. You can use your tax ID number for the rest of your life.",
  },
  {
    question: "Is it necessary to carry out the evaluation process and how long does it take?",
    answer:
      "The appraisal report is protection against exaggerated real estate prices. When one buys a property, the Land Registry requests the valuation report validated by the SPK as a proof document that the transaction was made at the correct price. The assessment is an independent department of the Land Registry's bureaucration. The process takes 3 to 4 days.",
  },
  {
    question: "How long is the validity period of the evaluation report?",
    answer:
      "Title deed offices require valuation reports that have been prepared within the past three months. If the validation checks of our customers' Assessment Reports have expired, Antalya Homes helps our customers renew their reports for free.",
  },
  {
    question: "Can I pay in installments for new projects?",
    answer:
      "Yes. You will usually pay a deposit of 10% and then 30% as a down payment within four weeks. Most projects offer stage payments (a lump sum is paid after each stage of construction) often with a degree of flexibility depending on your circumstances. This will be agreed upon at the time the contract is signed upon.",
  },
  {
    question: "Who determines the price of the property?",
    answer:
      "If you are buying a property in a new project, the price will be set by the project management. Regardless of agent commissions, you still have to pay the same price with whomever you buy through, whether you go direct to the developer or through an agent.",
  },
  {
    question: "What is required when transferring the title deed?",
    answer:
      "You need: • Evaluation Report\n• Passport translation at a notary public\n• Power of attorney (if required)\n• Tax number\n• Land tax number\n• Bank account",
  },
  {
    question: "How long does it take to transfer the title deed?",
    answer:
      "Generally, it takes one day after applying to the General Directorate of Land Registry with all the required documents. Sometimes, depending on the intensity of work in the title deed offices, it may be a day or two late.",
  },
  {
    question: "What is meant by Title Deed Guarantee (Tapu Takip)?",
    answer:
      "A title deed guarantee is an alternative way to transfer title deeds in Turkey. Here, the buyer pays the money to the seller through Takasbank which is the central bank and transaction institution in Turkey. Funds are transferred to the seller after ensuring the successful transfer of the title deed to the buyer.",
  },
  {
    question: "What is the hypothec?",
    answer:
      "A hypothec is an obligation, right, or security granted by contract or by law to a debtor over the property of an account holder without transferring the title deed to the debtor in Turkey. The reservation right is canceled from the title deed upon payment of the obligation.",
  },
  {
    question: "Is an interpreter required for power of attorney in Turkey?",
    answer:
      "Since the power of attorney is a serious decision that allows another person to act on your behalf and all documents are in Turkish, it is necessary to have a sworn translator translate the information on the papers to be signed.",
  },
  {
    question: "Is it possible to give a power of attorney without coming to Turkey?",
    answer:
      "Yes, you can give a power of attorney at Turkish embassies. Also, notary offices in your country can prepare a power of attorney if your country is part of the Hague Apostille Convention.",
  },
  {
    question: "Is it possible to obtain a residence permit in Turkey (Ikamet Tezkeresi) when buying a property?",
    answer:
      "If the foreigner owns real estate in Turkey, he gets a residence permit that is renewed every two years as long as he retains the ownership.",
  },
  {
    question: "Do I need a residence permit to buy a property in Turkey?",
    answer:
      "No! However, having a residence permit has some advantages and the Antalya Homes team helps you to obtain your residence permit if you request it.",
  },
  {
    question: "When can I receive my property?",
    answer:
      "Your keys will be delivered on the day of the title deed transfer and you can move to your new home after the title deed transfer directly.",
  },
  {
    question: "What is the importance of DASK insurance?",
    answer:
      "DASK (Doğal Afet Sigortalar Kurumu) is mandatory earthquake insurance for utility subscriptions in Turkey. You cannot register your real estate for utilities such as water, electricity, and natural gas without a valid DASK in Turkey.",
  },
  {
    question: "Are there real estate management services in Turkey?",
    answer: "Yes, some companies provide property management services in every city.",
  },
  {
    question: "How much is the periodic property maintenance fee in Turkey?",
    answer:
      "Maintenance fees vary depending on the features. When there are more facilities in the complex, the maintenance fee can increase. We inform our clients of maintenance fees during viewing tours.",
  },
  {
    question: "What about furnishing my new home?",
    answer:
      "Many developers offer furniture bundles as part of their offering. If you wish, you can buy a furnished property or we can advise you through a furniture package. You can move in once it's done after taking possession.",
  },
  {
    question: "How can I insure my property in Turkey?",
    answer:
      "Real estate is insured about the property's features. Insurance companies will make their bids when you give them the necessary information about your home. They will complete the insurance purchase after you confirm the price. Real estate insurance is one of our after-sales services.",
  },
  {
    question: "How do I pay my utility bills in Turkey?",
    answer:
      "There are bill payment centers spread in all districts of Turkey. You can pay your bills by going to one of these centers. You can also issue automatic payment orders for your utility bills. Antalya Homes will also help you with this, as a free after-sales service.",
  },
  {
    question: "What are the expected costs when I want to resell my property?",
    answer:
      "If you have owned the property for five years or more, you are exempt from real estate gains tax. You are supposed to make sure that all bills are paid to date.",
  },
  {
    question: "Is it easy to rent out a property?",
    answer:
      "Yes. Turkey offers good investment opportunities with a high return on investment. Antalya Homes follows this process to its customers as a free after-sales service.",
  },
  {
    question: "Who prepares the sales contract?",
    answer: "Our sales agreements are prepared by the company's lawyer.",
  },
  {
    question: "Can the sales contract be relied upon in the event of any unexpected situation?",
    answer:
      "The contract explains the terms of the agreement between the seller and the buyer. In the event of any dispute, contracts can be put into operation.",
  },
  {
    question: "What is TeleProperty?",
    answer: "TeleProperty is an Antalya Homes service where buyers can buy their dream home online.",
  },
  {
    question: "Who can sell real estate in Turkey?",
    answer:
      "Waiters, jewelry and leather dealers, and workers in the tourism sector are famous for real estate deals in Turkey. Therefore, dealing with a professional company avoids unwanted results.",
  },
  {
    question: "Why do I need guidance and the use of a real estate agent?",
    answer:
      "This has several advantages. First, you get access to a wide range of properties that match your criteria and not just one specific developer. Then you will benefit from our expertise and a fully staffed office to support you when you return home.",
  },
  {
    question: "What are the various other services offered by Antalya Homes?",
    answer: "Antalya Homes provides the best customer service at every step of your property buying process.",
  },
  {
    question: "What are the costs and fees for the real estate agent service?",
    answer:
      "In Turkey, real estate agent fees are determined by laws. When selling a property, registered and licensed real estate agents are entitled to a 2% service fee from the buyer and seller separately on the actual sale price of the property.",
  },
  {
    question: "Why Antalya Homes is the leader in the Turkish real estate market?",
    answer:
      "Antalya Homes is a professional real estate company. We work with the values of our company and the principles of the business world. Our customers express their gratitude to our company after experiencing its professional service at Antalya Homes.",
  },
  {
    question: "Why should I take a viewing tour with Antalya Homes?",
    answer:
      "Antalya Homes offers a smooth real estate purchase process. You get service from professionals. They speak your language and know your culture. You will save a lot of time, effort and money by dealing with our company.",
  },
  {
    question: "How are the viewing tours with Antalya Homes?",
    answer:
      "An important part of our service is the Turkey property inspection trips that we arrange for each client. Each tour is unique and tailored to suit the requirements of our clients. We prepare the visit list according to your preferences. We first show you the locations you are interested in. Then we go to real estate to check it out.",
  },
]

export function FAQContent() {
  const { t } = useLanguage()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = useMemo(() => {
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder={t("searchFAQ")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader
                  className="cursor-pointer flex flex-row items-center justify-between"
                  onClick={() => toggleExpand(index)}
                >
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                  {expandedIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CardHeader>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent>
                        <p>{item.answer}</p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <FAQSchema faqItems={faqItems} />
    </>
  )
}

