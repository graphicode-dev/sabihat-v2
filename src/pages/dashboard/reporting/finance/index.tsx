import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import BalanceSheet from "../../../../components/reporting/finance/BalanceSheet";
import GeneralLedger from "../../../../components/reporting/finance/GeneralLedger";
import IncomeStatement from "../../../../components/reporting/finance/IncomeStatement";
import TrialBalance from "../../../../components/reporting/finance/TrialBalance";

function FinancePage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item label="Balance Sheet" value="balance-sheet">
                    <BalanceSheet />
                </Tabs.Item>
                <Tabs.Item label="General Ledger" value="general-ledger">
                    <GeneralLedger />
                </Tabs.Item>
                <Tabs.Item label="Income Statement" value="income-statement">
                    <IncomeStatement />
                </Tabs.Item>
                <Tabs.Item label="Trial Balance" value="trial-balance">
                    <TrialBalance />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default FinancePage;
